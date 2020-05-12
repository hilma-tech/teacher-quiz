const { GO_BACK_TO_SKIPPED_Q } = require('../../constStr').quest;
const { elicitSlotUpdatedIntent } = require('../../constStr').obj;

module.exports = {
    EndOfOrderedQHandler: {
        handle(handlerInput, sSo = '') {
            return handlerInput.responseBuilder
                .addElicitSlotDirective('goBackToSkippedQ', elicitSlotUpdatedIntent)
                .speak(`${sSo} ${GO_BACK_TO_SKIPPED_Q}`)
                .reprompt(GO_BACK_TO_SKIPPED_Q)
                .getResponse();
        }
    },


    EndOfChallengeHandler: {
        handle(handlerInput, { so = '', sSo = '' }) {
            ///sending the answers somewhere
            store.setCompleteChallenges();
            const startOfSpeech = so || `${sSo} you have finished the challenge, wall done!`;

            if (store.challenges.length) {
                const reprompt = 'would you like to move to another challenge?'
                const speechOutput = `${startOfSpeech} you have other challenges available. ${reprompt}`

                return handlerInput.responseBuilder
                    .addElicitSlotDirective('exitYesOrNo', elicitSlotUpdatedIntent)
                    .speak(speechOutput)
                    .reprompt(reprompt)
                    .getResponse();
            }
            else {
                const speechOutput = `${startOfSpeech} you dont have other challenges. see you soon!`;

                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .withShouldEndSession(true);
            }
        }
    }



}



