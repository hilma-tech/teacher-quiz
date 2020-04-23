const Alexa = require('ask-sdk-core');

const ORDER_Q = 'moving to question number';
const SKIPPED_Q = 'coming back to question number';

const AnswerIntent = {
    canHandle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            intentName === "AnswerIntent" ||
            intentName === 'WantToAnswerIntent' ||
            intentName === "AMAZON.YesIntent" &&
            attributes.counter < attributes.numOfQ;
    },

    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        const { counter, numOfQ, skippedQ, currChall } = attributes;
        const { questions } = currChall;

        isSkippedQ = counter === numOfQ;

        const index = isSkippedQ ? skippedQ.shift() : counter;
        const currQ = questions[index];

        const startOfSpeech = isSkippedQ ? SKIPPED_Q : ORDER_Q;

        const reprompt = `the question is, ${currQ}.\
        would you like to answer it or skip to the next question?answer yes to answer and no to skip`;

        return handlerInput.responseBuilder
            .speak(`${startOfSpeech} ${index}, ${reprompt}`)
            .reprompt(reprompt)
            .getResponse();
    }
};

module.exports=AnswerIntent;