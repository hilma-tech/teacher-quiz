const Alexa = require('ask-sdk-core');
const challenges = require('../../../../teacherData/questionTemplate.json');
const util = require('util')

const SelectChallengeIntent=require('./SelectChallengeIntent')

const LAUNCH_OPENING = 'welcome to the amazing teacher quiz. ';

const ONE_CHALLENGE = 'please repeat its name to start the challenge.'
const SEVERAL_CHALLENGES = 'please say the name of the challenge you want to start.'

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        global.DB.setChallenges(challenges);
        const speakOutput = getSpeakOutput(challenges);
        const dynamicEntities = changeChallengeNameTypeValues(challenges);

        return handlerInput.responseBuilder
            // .addElicitSlotDirective('challengeName', {
            //     name: 'SelectChallengeIntent',
            //     confirmationStatus: 'NONE',
            //     slots: {}
            // })
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective(dynamicEntities)
            .getResponse();
    }
};

function changeChallengeNameTypeValues(challengeArr) {

    const slotValues = challengeArr.map((chall, id) => {
        return { id, name: { value: chall.name } }
    })

    return {
        type: "Dialog.UpdateDynamicEntities",
        updateBehavior: "REPLACE",
        types: [
            {
                name: "challengeNameType",
                values: slotValues
            }
        ]
    };
}

function getSpeakOutput(challenges) {

    const createSentence = (arr) => {
        const last = arr.pop();
        return arr.join(', ') + (arr.length ? ' and ' : '') + last
    }

    const numOfC = Object.keys(challenges).length;
    const cNames = challenges.map(chall => chall.name);

    const listOfCNames = createSentence(cNames);

    return `${LAUNCH_OPENING} you have ${numOfC} challenges available, ${listOfCNames}.\
            ${numOfC === 1 ? ONE_CHALLENGE : SEVERAL_CHALLENGES}`
}


// const LaunchRequestHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//     },
//     handle(handlerInput) {

//         return SelectChallengeIntent.handle(handlerInput);
//     }
// };

module.exports = LaunchRequestHandler;