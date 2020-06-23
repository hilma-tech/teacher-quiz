const Alexa = require('ask-sdk-core');
const { clearChallSlots } = require('../../const').updateSlotsInElicit;
const { createQResponse, returnEndSessionHandler } = require('../../functions');


const SkipHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "SkipIntent"
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
            .addElicitSlotDirective(slotToElicit, clearChallSlots)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

module.exports = SkipHandler;

