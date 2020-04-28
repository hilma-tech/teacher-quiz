const Alexa = require('ask-sdk-core');
const challenges = require('../../../../teacherData/questionTemplate.json');
const { FirstAnswerhandler } = require('./AnswerIntent')
// const SelectChallengeIntent = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
//             Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
//     },
//     handle(handlerInput) {
//         const challengeName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'challengeName');
//         // const dynamicEntities = changeChallengeNameTypeValues(challenges);


//         return handlerInput.responseBuilder
//             .speak(`you choose ${challengeName}. say start to start the challenge`)
//             // .reprompt(speakOutput)
//             // .addDirective(dynamicEntities)

//             .getResponse();
//     }
// };


const SelectChallengeIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
    },
    handle(handlerInput) {
        // const challengeName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'challengeName');
        const id =handlerInput.requestEnvelope.request.intent.slots.challengeName.resolutions.resolutionsPerAuthority[1].values[0].value.id
        global.DB.setCurrChall(id);
        // return FirstAnswerhandler.canHandle(handlerInput)
        return FirstAnswerhandler.handle(handlerInput)


        // return handlerInput.responseBuilder
        //     .speak(`you choose ${challengeName}`)
        //     // .reprompt(speakOutput)
        //     // .addDirective(dynamicEntities)
        //     .getResponse();
    }
};







const LAUNCH_OPENING = 'welcome to the amazing teacher quiz. ';

const ONE_CHALLENGE = 'please repeat its name to start the challenge.'
const SEVERAL_CHALLENGES = 'please say the name of the challenge you want to start.'

// const SelectChallengeIntent = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//     },
//     handle(handlerInput) {
//         global.RDB.setChallenges(challenges);
//         const speakOutput = getSpeakOutput(challenges);
//         const dynamicEntities = changeChallengeNameTypeValues(challenges);

//         return handlerInput.responseBuilder
//             .addElicitSlotDirective('challengeName', {
//                 name: 'SelectChallengeIntent',
//                 confirmationStatus: 'NONE',
//                 slots: {}
//             })
//             .speak(speakOutput)
//             // .reprompt(speakOutput)
//             // .addDirective(dynamicEntities)
//             .getResponse();
//     }
// };

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

// console.log(util.inspect(changeChallengeNameTypeValues(challenges), {depth: null}))



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


module.exports = SelectChallengeIntent;