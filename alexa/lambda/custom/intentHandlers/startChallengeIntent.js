// const questions = require('../../../../teacherData/questionTemplate.json');
// console.log('questions: ', questions);
const Alexa = require('ask-sdk-core');
const challengesDB = require('../../../../teacherData/questionTemplate.json');



const StartChallengeIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === "StartChallengeIntent";
    },

    handle(handlerInput) {
        let attributes = handlerInput.attributesManager.getSessionAttributes();

        const challenges = attributes.challenges || challengesDB;
        attributes.currChall = challenges[0];
        const { name, questions } = attributes.currChall;

        let addedAttributes = {
            counter: 1,
            skippedQ: [],
            numOfQ: Object.keys(questions).length
        }

        handlerInput.attributesManager.setSessionAttributes({...attributes,...addedAttributes});


        let at=handlerInput.attributesManager.getSessionAttributes();

        const speechOutput = `welcome to the ${name} quiz.\
        you have ${Object.keys(questions).length} questions to answer.
        question number one is,\
        ${questions[1].qText}.
        would you like to answer it or skip to the next question?answer yes to answer and no to skip`;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

module.exports = StartChallengeIntent;