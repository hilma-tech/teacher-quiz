const Alexa = require('ask-sdk-core');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'i will save yout progress. see you soon!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = CancelAndStopIntentHandler;