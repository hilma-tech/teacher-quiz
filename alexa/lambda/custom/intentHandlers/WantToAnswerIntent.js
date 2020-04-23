const Alexa = require('ask-sdk-core');

const WantToAnswerIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WantToAnswerIntent'
            || intentName === "AMAZON.YesIntent"
            && counter < numOfQ || skippedQ.length;
    },
    handle(handlerInput) {
        const speakOutput = 'please say the answer is following the answer';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = WantToAnswerIntent;