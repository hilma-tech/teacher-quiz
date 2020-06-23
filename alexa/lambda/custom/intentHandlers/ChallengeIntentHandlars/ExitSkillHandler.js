const Alexa = require('ask-sdk-core');
const { exit } = require('../../const').exit;
const { ExitSkill } = require('./Handlers');

const ExitSkillHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo');
    },

    handle(handlerInput) {
        const ifYes = Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo') === 'yes';
        let att = handlerInput.attributesManager.getSessionAttributes();

        if (att.counter === att.currLastQ && !ifYes) {
            return ExitSkill.handle(handlerInput);
        }
        // in the middle of challenge.between questions.
        else if (att.counter !== att.currLastQ && ifYes) {
            //saving the progress in the challenges
            return ExitSkill.handle(handlerInput);
        }
        else {
            const [speechOutput, reprompt, slotToElicit, updateSlotsInElicit] = exit(ifYes, att);
            return handlerInput.responseBuilder
                .addElicitSlotDirective(slotToElicit, updateSlotsInElicit)
                .speak(speechOutput)
                .reprompt(reprompt)
                .getResponse();
        }
    }
};

module.exports = ExitSkillHandler;