const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const {
    exit: { EXIT_GREETING },
    obj: { elicitSlotUpdatedIntent }
} = require('../../constStr');


const ExitSkillHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo');
    },

    handle(handlerInput) {
        let ifYes = Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo') === 'yes';
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        const exitSkill = () => {
            return handlerInput.responseBuilder
                .speak(EXIT_GREETING)
                .withShouldEndSession(true)
                .getResponse();
        }

        //if its the end of the challenge 
        if (counter === numOfQ) {
            if (ifYes) {
                let  aChallNames = store.aChall.map(chall => chall.name);
                const challList = createStrList(aChallNames);

                const cNum = store.aChall.length;

                const speechOutput = `you currently have ${cNum} available challenge - ${challList}.
                \ ${cNum - 1 ? 'which challenge would you like to start?' : 'you want to start it?'}`

                return handlerInput.responseBuilder
                    .addElicitSlotDirective('challengeName', {
                        name: 'SelectChallengeIntent',
                        confirmationStatus: 'NONE',
                        slots: {}
                    })
                    .speak(speechOutput)
                    .reprompt(speechOutput)
                    .getResponse();
            }
            else exitSkill();
        }
        //in the middle of challenge. between questions.
        else {

            if (ifYes) {
                //saving the progress in the challenges
                return exitSkill();
            }
            else {
                return handlerInput.responseBuilder
                    .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
                    .speak('so im moving to the next question')
                    .getResponse();
            }
        }

    }
};


function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}


module.exports = ExitSkillHandler;