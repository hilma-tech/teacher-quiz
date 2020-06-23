const Alexa = require('ask-sdk-core');
const store = require('../../store');
const { firstQuest, AnswerProcessing, nextQuest } = require('../../const').quest;
const { clearChallSlots } = require('../../const').updateSlotsInElicit;
const { EndOfChallengeHandler, EndOfOrderedQHandler } = require('./Handlers');

const FirstAnswerhandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
    },

    handle(handlerInput) {
        let { id, name: sVal } = Alexa.getSlot(handlerInput.requestEnvelope, 'challengeName').resolutions.resolutionsPerAuthority[1].values[0].value;
        id = JSON.parse(id);

        if (id === null || id === undefined) {
            if (sVal === 'yes') store.setCurrChall();

            else return handlerInput.responseBuilder
                .speak('Its looks like you dont want to start a challenge. hope to see you soon!')
                .withShouldEndSession(true)
                .getResponse();
        }
        else store.setCurrChall(id);

        const qSum = Object.keys(store.currChall.questions).length;
        const [speechOutput, reprompt] = firstQuest(qSum);


        let answeredQ = {};
        for (let i = 1; i <= qSum; i++)answeredQ[i] = false;

        handlerInput.attributesManager.setSessionAttributes({
            counter: 1,
            qSum,
            answeredQ,
            currLastQ: qSum,
            skipMode: false,
            questMode: true
        });

        return handlerInput.responseBuilder
            .addElicitSlotDirective('answer', clearChallSlots)
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
        store.setAnswers(at.counter, answer, 100);

        const aScore = `your answer is correct!`;

        const endSession = returnEndSessionHandler(at, handlerInput, aScore);
        if (endSession) return endSession;

        const [speechOutput, reprompt] = AnswerProcessing(aScore);

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo', clearChallSlots)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const NextQuestionHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && (Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
                || Alexa.getSlotValue(handlerInput.requestEnvelope, 'goBackToSkippedQ'))
    },

    handle(handlerInput) {
        const yesOrNo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo');
        const goBackToSkippedQ = Alexa.getSlotValue(handlerInput.requestEnvelope, 'goBackToSkippedQ');

        const currYesOrNo = yesOrNo || goBackToSkippedQ;
        let att = handlerInput.attributesManager.getSessionAttributes();

        if (currYesOrNo === 'no' && goBackToSkippedQ) {
            const sSo = 'i will save your progress.';
            return EndOfChallengeHandler.handle(handlerInput, sSo);
        }


        const [speechOutput, reprompt, slotToElicit] = nextQuest(currYesOrNo, att, Boolean(goBackToSkippedQ));
        handlerInput.attributesManager.setSessionAttributes(att);

        return handlerInput.responseBuilder
            .addElicitSlotDirective(slotToElicit, clearChallSlots)
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



function returnEndSessionHandler(at, handlerInput, sSo = '') {
    if (!store.lastQ && !at.answeredQ[at.counter] || (at.skipMode && at.counter !== at.currLastQ)) return;

    const isSkippedQ = Object.values(at.answeredQ).includes(false);
    const isLast = at.counter === at.currLastQ;

    //end of ordered q
    if (isLast && isSkippedQ)
        return EndOfOrderedQHandler.handle(handlerInput, sSo);

    //end of challenge
    else if (isLast && !isSkippedQ)
        return EndOfChallengeHandler.handle(handlerInput, sSo);

    else return;
}