const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const {
    quest: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q
    },
    obj: { elicitSlotUpdatedIntent }
} = require('../../constStr');
const { createQReprompt, getCurrentQuestIndex, createQResponse } = require('../../functions');

const { EndOfOrderedQHandler } = require('./Handlers');

const SkipOrAnswerHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },
    handle(handlerInput) {
        let skipOrAnswer = Alexa.getSlot(handlerInput.requestEnvelope, 'skipOrAnswer').resolutions.resolutionsPerAuthority[0].values[0].value.name;
        let speechOutput, reprompt, slotToElicit;

        if (skipOrAnswer === 'answer') {
            speechOutput = reprompt = `Please say the answer`;
            slotToElicit = skipOrAnswer;
        }

        else if (skipOrAnswer === 'skip') {
            let prevAt = handlerInput.attributesManager.getSessionAttributes();
            let at;
            prevAt.skippedQ.push(prevAt.counter);
            ([speechOutput, reprompt, at] = createQResponse({ ...prevAt }, true))

            //if we finished going over all the questions,and we skipped a question 
            console.log('boolll', prevAt.counter === at.numOfQ, at.skippedQ.length, prevAt.counter === at.numOfQ && at.skippedQ.length)
            if (prevAt.counter === at.numOfQ && at.skippedQ.length)
                return EndOfOrderedQHandler.handle(handlerInput);

            handlerInput.attributesManager.setSessionAttributes(at);
            slotToElicit = 'skipOrAnswer';
        }

        return handlerInput.responseBuilder
            .addElicitSlotDirective(slotToElicit, elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

module.exports = {
    SkipOrAnswerHandler
};









// const ConfirmAnswerHandler = {
//     canHandle(handlerInput) {
//         let answerSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'answer')

//         return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
//             && answerSlot
//             && answerSlot.confirmationStatus === 'CONFIRMED';


//     },
//     handle(handlerInput) {
//         const { name: challengeName, questions } = store.currChall
//         const at = handlerInput.attributesManager.getSessionAttributes();



//         return handlerInput.responseBuilder
//             .addElicitSlotDirective('skipOrAnswer',
//                 {
//                     name: 'ChallengeIntent',
//                     confirmationStatus: 'NONE',
//                     slots: {}
//                 })
//             .speak(speechOutput)
//             .reprompt(reprompt)
//             .getResponse();
//     }
// };


