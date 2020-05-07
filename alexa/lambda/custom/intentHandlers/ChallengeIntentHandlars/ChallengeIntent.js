const Alexa = require('ask-sdk-core');
const store = require('../../store').getInstance();
const {
    quest: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q,
        MOVE_TO_NEXT_Q_QUEST,
        GO_BACK_TO_SKIPPED_Q
    },
    obj: { elicitSlotUpdatedIntent }
} = require('../../constStr');

const { createQReprompt, getCurrentQuestIndex } = require('../../functions');

const SkipOrAnswerHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },
    handle(handlerInput) {
        let skipOrAnswer = Alexa.getSlot(handlerInput.requestEnvelope, 'skipOrAnswer').resolutions.resolutionsPerAuthority[0].values[0].value.name;
        let speechOutput, reprompt, slotToElicit;

        if (skipOrAnswer === 'answer') {
            speechOutput = reprompt = `Please say the answer`;
            slotToElicit = 'answer';
        }

        else if (skipOrAnswer === 'skip') {
            let at = handlerInput.attributesManager.getSessionAttributes();

            at.skippedQ.push(at.counter);
            const [qIndex, isSkippedQuest, attributes] = getCurrentQuestIndex(at);
            const { qText } = store.currChall.questions[qIndex];
            
            reprompt = createQReprompt(qText);
            speechOutput = `${SKIP_THIS_Q} ${isSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}. ${reprompt}`
            
            handlerInput.attributesManager.setSessionAttributes(attributes);
            slotToElicit = 'skipOrAnswer';
        }

        return handlerInput.responseBuilder
            .addElicitSlotDirective(slotToElicit, elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const AnswerProcessingHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && (counter < numOfQ || skippedQ.length);
    },

    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        const { aText } = store.currChall.questions[at.counter];
        const answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer');
        ///check if the answer is correct
        ///

        store.setAnswers(at.counter, at.counter, 100)


        handlerInput.attributesManager.setSessionAttributes(at);

        const reprompt = MOVE_TO_NEXT_Q_QUEST;
        const speechOutput = `your answer was correct! ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const EndOfOrderedQHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            && (counter === numOfQ && skippedQ.length);
    },

    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addElicitSlotDirective('goBackToSkippedQ', elicitSlotUpdatedIntent)
            .speak(GO_BACK_TO_SKIPPED_Q)
            .reprompt(GO_BACK_TO_SKIPPED_Q)
            .getResponse();

    }
};


const EndOfChallengeHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
            // && Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
            && (counter === numOfQ && !skippedQ.length);
    },

    handle(handlerInput) {
        ///sending the answers somewhere
        store.setCompleteChallenges();
        const startOfSpeech = 'you have finished the challenge, wall done!';

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
};


module.exports = {
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    EndOfOrderedQHandler,
    EndOfChallengeHandler
};









// const ConfirmAnswerHandler = {
//     canHandle(handlerInput) {
//         let answerSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'answer')

//         return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === "ChallengeIntent"
//             && answerSlot
//             && answerSlot.confirmationStatus === 'CONFIRMED';


//     },
//     handle(handlerInput) {
//         const { name: challengeName, questions } = store.currChall
//         const at = handlerInput.attributesManager.getSessionAttributes();



//         return handlerInput.responseBuilder
//             .addElicitSlotDirective('skipOrAnswer',
//                 {
//                     name: 'ChallengeIntent',
//                     confirmationStatus: 'NONE',
//                     slots: {}
//                 })
//             .speak(speechOutput)
//             .reprompt(reprompt)
//             .getResponse();
//     }
// };


