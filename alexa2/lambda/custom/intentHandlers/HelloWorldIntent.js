const Alexa = require('ask-sdk-core');


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        // const lala = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lala')
        // console.log('lala: ', lala);
        // const speakOutput = `hello world!!! your slot value is ${lala}`;
        const speakOutput = 'Hello World!';


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = HelloWorldIntentHandler;