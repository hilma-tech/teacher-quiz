const Alexa = require('ask-sdk-core');
// const store = require('../../store').getInstance();
const { elicitSlotUpdatedIntent } = require('../../constStr').obj;
const { createQResponse, returnEndSessionHandler } = require('../../functions');


const SkipOrAnswerHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },
    handle(handlerInput) {
        let skipOrAnswer = Alexa.getSlot(handlerInput.requestEnvelope, 'skipOrAnswer').resolutions.resolutionsPerAuthority[0].values[0].value.name;
        let at = handlerInput.attributesManager.getSessionAttributes();
        let speechOutput, reprompt, slotToElicit;

        if (skipOrAnswer === 'answer') {
            speechOutput = `Please say the answer`;
            reprompt = speechOutput;
            slotToElicit = skipOrAnswer;
        }

        else if (skipOrAnswer === 'skip') {
            let _at;
            ([speechOutput, reprompt, _at] = createQResponse({ ...at }, true))

            const endSession = returnEndSessionHandler(_at, handlerInput);
            if (endSession) return endSession;

            slotToElicit = 'skipOrAnswer';
            at = _at;
        }
        handlerInput.attributesManager.setSessionAttributes(at);

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


