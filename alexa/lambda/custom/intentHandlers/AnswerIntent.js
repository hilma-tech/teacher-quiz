const Alexa = require('ask-sdk-core');

const ORDER_Q = 'moving to question number';
const SKIPPED_Q = 'coming back to question number';

const AnswerIntent = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && intentName === "AnswerIntent"
            // || intentName === 'WantToAnswerIntent'
            // || intentName === "AMAZON.YesIntent"
            
            // || intentName === 'SkipQuestionIntent'
            && counter < numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        const { counter, numOfQ, skippedQ, currChall } = attributes;
        const { questions } = currChall;

        let qIndex, startOfSpeech;

        //skipped question
        if (counter === numOfQ) {
            qIndex = skippedQ.shift();
            startOfSpeech = `${SKIPPED_Q} ${qIndex},`;
        }
        else {
            attributes.counter++;
            qIndex = attributes.counter;
            startOfSpeech = `${ORDER_Q} ${qIndex},`;
        }

        const isSkippedQ = Alexa.getIntentName(handlerInput.requestEnvelope) === 'SkipQuestionIntent';
        const currQ = questions[qIndex].qText;
        const reprompt = `the question is, ${currQ}.\
        would you like to answer it or skip to the next question?answer yes to answer and no to skip`;

        return handlerInput.responseBuilder
            .speak(`${isSkippedQ ? 'skipped this question.' : ''} ${startOfSpeech} ${reprompt}`)
            .reprompt(reprompt)
            .getResponse();
    }
};

module.exports = AnswerIntent;