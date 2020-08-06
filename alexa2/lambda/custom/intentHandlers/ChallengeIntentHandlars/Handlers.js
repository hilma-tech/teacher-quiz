// console.log('quest ', require('../../const'));
const { endOfOrderedQ, endOfChallengeWithAvailChall, endOfChallenge } = require('../../const').handler;
const { clearChallSlots } = require('../../const.js').updateSlotsInElicit;
const store = require('../../store');

module.exports = {
    EndOfOrderedQHandler: {
        handle(handlerInput, sSo = '') {
            let att = handlerInput.attributesManager.getSessionAttributes();

            handlerInput.attributesManager.setSessionAttributes({
                ...att,
                questMode: false,
                skipMode: true,
                counter: 0,
                currLastQ: undefined
            });

            const [speechOutput, reprompt] = endOfOrderedQ(sSo);

            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(reprompt)
                .addElicitSlotDirective('goBackToSkippedQ', clearChallSlots)
                .getResponse();
        }
    },


    EndOfChallengeHandler: {
        handle(handlerInput, sSo = '') {
            ///sending the answers somewhere
            store.addCompChall();

            let att = handlerInput.attributesManager.getSessionAttributes();
            att.questMode = false;
            handlerInput.attributesManager.setSessionAttributes(att);

            if (store.availChalls.length) {
                const [speechOutput, reprompt] = endOfChallengeWithAvailChall(sSo);

                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(reprompt)
                    .addElicitSlotDirective('exitYesOrNo', clearChallSlots)
                    .getResponse();
            }
            else {
                const [speechOutput] = endOfChallenge(sSo);

                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .withShouldEndSession(true)
                    .getResponse();

            }
        }
    },

    ExitSkill: {
        handle(handlerInput) {
            let att = handlerInput.attributesManager.getSessionAttributes();
            att.questMode = false;
            handlerInput.attributesManager.setSessionAttributes(att);

            return handlerInput.responseBuilder
                .speak('i will save your progress. see you soon!')
                .withShouldEndSession(true)
                .getResponse();
        }
    }
}



