const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const {
    quest: {
        ORDER_Q,
        SKIPPED_Q,
        LAST_Q
    },
    obj: { elicitSlotUpdatedIntent }
} = require('../../constStr');

const { createQReprompt, getCurrentQuestIndex } = require('../../functions')


const FirstAnswerhandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
    },

    handle(handlerInput) {
        let { id, name: sVal } = Alexa.getSlot(handlerInput.requestEnvelope, 'challengeName').resolutions.resolutionsPerAuthority[1].values[0].value;
        id = JSON.parse(id);

        if (!id) {
            if (sVal === 'yes') id = 0;
            else return handlerInput.responseBuilder
                .speak('ho its looks like you dont want to start a challenge. hope to see you soon!')
                .withShouldEndSession(true)
                .getResponse();
        }

        store.setCurrChall(id);

        const { name: challengeName, questions } = store.currChall
        const { qText } = questions[1];

        const qNum = Object.keys(questions).length;
        const reprompt = createQReprompt(qText);
        const speechOutput = `you have chosen ${challengeName} challenge. you have ${qNum} questions in this challenge. starting question number 1. ${reprompt}`;

        handlerInput.attributesManager.setSessionAttributes({
            counter: 1,
            skippedQ: [],
            numOfQ: Object.keys(questions).length
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
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            // && (counter < numOfQ || skippedQ.length);
    },

    handle(handlerInput) {
        const yesOrNo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo');
        const ifYes = yesOrNo === 'yes';

        let speechOutput, reprompt, slotToElicit;

        if (ifYes) {
            const attributes = handlerInput.attributesManager.getSessionAttributes();
            const [qIndex, ifSkippedQuest, at] = getCurrentQuestIndex(attributes);
            handlerInput.attributesManager.setSessionAttributes(at);

            const { qText } = store.currChall.questions[qIndex];
            const ifLast = at.counter === at.numOfQ && !at.skippedQ.length;

            reprompt = createQReprompt(qText);
            speechOutput = `${ifSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}. ${ifLast ? LAST_Q : ''}. ${reprompt}`;
            slotToElicit = 'skipOrAnswer';
        }
        else {
            speechOutput = 'do you want to exit this skill?'
            slotToElicit = 'exitYesOrNo';
        }

        return handlerInput.responseBuilder
            .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};



module.exports = {
    FirstAnswerhandler,
    NextQuestionHandler
}