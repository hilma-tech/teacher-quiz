const Alexa = require('ask-sdk-core');
const challenges = require('../../../../teacherData/questionTemplate.json');
const store = require('../store').getInstance();
const fn = require('../functions');

const {
    launch: {
        LAUNCH_OPENING,
        ONE_CHALLENGE,
        SEVERAL_CHALLENGES
    }
} = require('../constStr');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        store.setChallenges(challenges);

        const numOfC = Object.keys(challenges).length;
        const cNames = challenges.map(chall => chall.name);

        const listOfCNames = fn.createStrList(cNames);

        const speakOutput = `${LAUNCH_OPENING} you have ${numOfC} challenges available, ${listOfCNames}.\
            ${numOfC === 1 ? ONE_CHALLENGE : SEVERAL_CHALLENGES}`;

        let slotValues = challenges.map((chall, id) => ({ id, name: { value: chall.name } }));

        const yesNo = [
            { name: { value: "yes", synonyms: ["yep", "yeah"] } },
            { name: { value: "no", synonyms: ["nope", "I do not", "no thank you"] } }
        ]

        const dynamicEntities = {
            type: "Dialog.UpdateDynamicEntities",
            updateBehavior: "REPLACE",
            types: [
                {
                    name: "challengeNameType",
                    values: [...slotValues, ...yesNo]
                }
            ]
        };

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective(dynamicEntities)
            .getResponse();
    }
};

module.exports = LaunchRequestHandler;