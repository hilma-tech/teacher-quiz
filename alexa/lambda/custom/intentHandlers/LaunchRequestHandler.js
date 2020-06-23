const Alexa = require('ask-sdk-core');
const { speak } = require('../const').launch;
const store = require('../store');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },

    handle(handlerInput) {
        const [speakOutput, reprompt] = speak();

        const dynamicEntities = {
            type: "Dialog.UpdateDynamicEntities",
            updateBehavior: "REPLACE",
            types: [
                {
                    name: "challengeNameType",
                    values: store.getChallAsSlotVal()
                }
            ]
        };

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .addDirective(dynamicEntities)
            .getResponse();
    }
};

module.exports = LaunchRequestHandler;