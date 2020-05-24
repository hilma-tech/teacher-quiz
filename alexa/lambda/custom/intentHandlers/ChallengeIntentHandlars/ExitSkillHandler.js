const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const { elicitSlotUpdatedIntent } = require('../../constStr').obj;

const { ExitSkill } = require('./Handlers');
const { createStrList, lastQ } = require('../../functions');

const ExitSkillHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo');
    },

    handle(handlerInput) {
        let ifYes = Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo') === 'yes';
        let at = handlerInput.attributesManager.getSessionAttributes();

        if (at.counter === at.currLastQ) {
            if (ifYes) {
                let aChallNames = store.aChall.map(chall => chall.name);
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
            else return ExitSkill.handle(handlerInput);
        }
        // in the middle of challenge.between questions.
        else {

            //saving the progress in the challenges
            if (ifYes) return ExitSkill.handle(handlerInput);

            else {
                return handlerInput.responseBuilder
                    .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
                    .speak('so im moving to the next question')
                    .getResponse();
            }
        }
    }
};

module.exports = ExitSkillHandler;