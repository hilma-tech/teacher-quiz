const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const { MOVE_TO_NEXT_Q_QUEST } = require('../../constStr').quest;
const { elicitSlotUpdatedIntent } = require('../../constStr').obj;


const { createQReprompt, createQResponse, returnEndSessionHandler } = require('../../functions')
const { EndOfChallengeHandler } = require('./Handlers');

const FirstAnswerhandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
    },

    handle(handlerInput) {
        let { id, name: sVal } = Alexa.getSlot(handlerInput.requestEnvelope, 'challengeName').resolutions.resolutionsPerAuthority[1].values[0].value;
        id = JSON.parse(id);

        if (id === null || id === undefined) {
            if (sVal === 'yes') {
                store.setCurrChall()
            }
            else return handlerInput.responseBuilder
                .speak('Its looks like you dont want to start a challenge. hope to see you soon!')
                .withShouldEndSession(true)
                .getResponse();
        }
        else store.setCurrChall(id);

        const { name: challengeName, questions } = store.currChall
        const { qText } = questions[1];

        const qNum = Object.keys(questions).length;
        const reprompt = createQReprompt(qText, qNum === 1);
        const speechOutput = `you have chosen ${challengeName} challenge. you have ${qNum} questions in this challenge. starting question number 1. ${reprompt}`;

        const numOfQ = Object.keys(questions).length;
        let answeredQ = {};
        for (let i = 1; i <= numOfQ; i++)answeredQ[i] = false;

        handlerInput.attributesManager.setSessionAttributes({
            counter: 1,
            numOfQ,
            answeredQ,
            currLastQ: numOfQ,
            skipMode: false
        });

        return handlerInput.responseBuilder
            .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const NextQuestionHandler = {
    canHandle(handlerInput) {

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && (Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
                || Alexa.getSlotValue(handlerInput.requestEnvelope, 'goBackToSkippedQ'))
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },

    handle(handlerInput) {
        const yesOrNo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo');
        const goBackToSkippedQ = Alexa.getSlotValue(handlerInput.requestEnvelope, 'goBackToSkippedQ');

        const currYesOrNo = yesOrNo || goBackToSkippedQ;
        let speechOutput, reprompt, slotToElicit;

        if (currYesOrNo === 'yes') {
            let at = handlerInput.attributesManager.getSessionAttributes();
            if (goBackToSkippedQ) {
                at.counter = 0;
                at.currLastQ = undefined;
            }
            slotToElicit = 'skipOrAnswer';
            ([speechOutput, reprompt, at] = createQResponse({ ...at }));
            handlerInput.attributesManager.setSessionAttributes(at);
        }
        else {
            if (goBackToSkippedQ) {
                const sSo = 'i will save your progress.';
                return EndOfChallengeHandler.handle(handlerInput, sSo);
            }
            speechOutput = reprompt = 'do you want to exit this skill?'
            slotToElicit = 'exitYesOrNo';
        }

        return handlerInput.responseBuilder
            .addElicitSlotDirective(slotToElicit, elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const AnswerProcessingHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },

    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        at.answeredQ[at.counter] = true;
        handlerInput.attributesManager.setSessionAttributes(at);

        const { aText } = store.currChall.questions[at.counter];
        const answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer');
        ///check if the answer is correct
        ///

        store.setAnswers(at.counter, at.counter, 100);

        const aScore = `your answer is correct!`;

        const endSession = returnEndSessionHandler(at, handlerInput, aScore);
        if (endSession) return endSession;

        const reprompt = MOVE_TO_NEXT_Q_QUEST;
        const speechOutput = `${aScore} ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


module.exports = {
    FirstAnswerhandler,
    NextQuestionHandler,
    AnswerProcessingHandler
}