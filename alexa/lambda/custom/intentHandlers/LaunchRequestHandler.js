const Alexa = require('ask-sdk-core');
const challenges = require('../../../../teacherData/questionTemplate.json');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.challenges = challenges;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        const speakOutput = 'welcome to the amazing teacher quiz.\
        if you dont know the rules, you can always say help to hear them again.\
        your teacher sent you a new challenge.\
        say start when you want to start the challenge';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = LaunchRequestHandler;