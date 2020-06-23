// console.log('quest ', require('../../const'));
// const { GO_BACK_TO_SKIPPED_Q } = require('../../const.js').quest;
const store = require('../../store');
const clearChallSlots = Object.freeze({
    name: 'ChallengeIntent',
    confirmationStatus: 'NONE',
    slots: {
        skipOrAnswer: {
            name: 'skipOrAnswer',
            confirmationStatus: 'NONE'
        },
        answer: {
            name: 'answer',
            confirmationStatus: 'NONE'
        },
        yesOrNo: {
            name: 'yesOrNo',
            confirmationStatus: 'NONE'
        },
        exitYesOrNo: {
            name: 'exitYesOrNo',
            confirmationStatus: 'NONE'
        },
        goBackToSkippedQ: {
            name: 'goBackToSkippedQ',
            confirmationStatus: 'NONE'
        }
    }
});

module.exports = {
    EndOfOrderedQHandler: {
        handle(handlerInput, sSo = '') {
            const GO_BACK_TO_SKIPPED_Q = 'you finished all your questions. \
            however you skipped some of them. would you like to come back and answer them?';

            let att = handlerInput.attributesManager.getSessionAttributes();
            if (!att.skipMode) att.skipMode = true;
            att.nextCurrLastQ = undefined;
            handlerInput.attributesManager.setSessionAttributes(att);

            return handlerInput.responseBuilder
                .addElicitSlotDirective('goBackToSkippedQ', clearChallSlots)
                .speak(`${sSo} ${GO_BACK_TO_SKIPPED_Q}`)
                .reprompt(GO_BACK_TO_SKIPPED_Q)
                .getResponse();
        }
    },


    EndOfChallengeHandler: {
        handle(handlerInput, sSo = '') {
            ///sending the answers somewhere
            store.addCompChall();
            const startOfSpeech = `${sSo} you have finished the challenge, wall done!`;

            if (store.availChalls.length) {
                const reprompt = 'would you like to move to another challenge?'
                const speechOutput = `${startOfSpeech} you have other challenges available. ${reprompt}`

                return handlerInput.responseBuilder
                    .addElicitSlotDirective('exitYesOrNo', clearChallSlots)
                    .speak(speechOutput)
                    .reprompt(reprompt)
                    .getResponse();
            }
            else {
                const speechOutput = `${startOfSpeech} you dont have other challenges. see you soon!`;

                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .withShouldEndSession(true)
                    .getResponse();

            }
        }
    },

    ExitSkill: {
        handle(handlerInput) {
            return handlerInput.responseBuilder
                .speak('i will save your progress. see you soon!')
                .withShouldEndSession(true)
                .getResponse();
        }
    }
}



