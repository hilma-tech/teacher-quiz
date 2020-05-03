const Alexa = require('ask-sdk-core');
const {
    str: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q
    },
    obj: { elicitSlotUpdatedIntent },
    fn: { createQReprompt }

} = require('../constStr');


const FirstAnswerhandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "SelectChallengeIntent";
    },

    handle(handlerInput) {
        const { name: challengeName, questions } = global.DB.currChall
        const at = handlerInput.attributesManager.getSessionAttributes();

        let addedAttributes = {
            counter: 1,
            skippedQ: [],
            numOfQ: Object.keys(questions).length
        }

        handlerInput.attributesManager.setSessionAttributes({ ...at, ...addedAttributes });
        const currQ = questions[1].qText;

        const reprompt = createQReprompt(currQ);
        const speechOutput = `you choose ${challengeName} challenge. starting from question number 1. ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const NextQuestionHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
        // && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const yesOrNo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo');

        if (yesOrNo === 'yes') {
            const [qIndex, ifSkippedQuest, at] = getCurrentQuestIndex(attributes);
            console.log('global.DB.currChall: ', global.DB.currChall);
            const { qText } = global.DB.currChall.questions[qIndex];
            const reprompt = createQReprompt(qText);
            const speechOutput = `${ifSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}.${qText} ${reprompt}`;

            handlerInput.attributesManager.setSessionAttributes(at);

            return handlerInput.responseBuilder
                .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
                .speak(speechOutput)
                .reprompt(reprompt)
                .getResponse();
        }
        else if (yesOrNo === 'no') {
            const speechOutput = 'do you want to exit this skill?'

            return handlerInput.responseBuilder
                .addElicitSlotDirective('exitYesOrNo', elicitSlotUpdatedIntent)
                .speak(speechOutput)
                .reprompt(speechOutput)
                .getResponse();
        }
    }
};


const ExitSkillHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo')
            && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        let ifYes = Alexa.getSlotValue(handlerInput.requestEnvelope, 'exitYesOrNo') === 'yes';
        if (ifYes) {
            return handlerInput.responseBuilder
                .shouldEndSession(true)
                .speak('i will save yout progress. see you soon!')
            // .getResponse();
        }
        else {
            return handlerInput.responseBuilder
                .addElicitSlotDirective('skipOrAnswer', elicitSlotUpdatedIntent)
                .speak('so im moving to the next question')
                .getResponse();
        }
    }
};

const SkipOrAnswerHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },
    handle(handlerInput) {
        let skipOrAnswer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer');
        let speechOutput, reprompt, slotToElicit;

        if (skipOrAnswer === 'answer') {
            speechOutput = reprompt = `please say the answer is, following your answer`;
            slotToElicit = 'answer';
        }

        else if (skipOrAnswer === 'skip') {
            let at = handlerInput.attributesManager.getSessionAttributes();

            at.skippedQ.push(at.counter);
            const [qIndex, isSkippedQuest, attributes] = getCurrentQuestIndex(at);
            const { qText } = global.DB.currChall.questions[qIndex];
            reprompt = createQReprompt(qText);
            speechOutput = `${SKIP_THIS_Q} ${isSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}.${reprompt}`
            handlerInput.attributesManager.setSessionAttributes({ ...at, ...attributes });
            slotToElicit = 'skipOrAnswer';
        }



        return handlerInput.responseBuilder
            .addElicitSlotDirective(slotToElicit, elicitSlotUpdatedIntent)
            // .shouldEndSession(false)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const AnswerProcessingHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
            // && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        const at = handlerInput.attributesManager.getSessionAttributes();
        const { aText } = global.DB.currChall.questions[at.counter];
        const answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer');
        ///check if the answer is correct
        ///

        global.DB.setAnswers(at.counter)


        handlerInput.attributesManager.setSessionAttributes(at);

        const reprompt = 'would you like to move to the next question?';
        const speechOutput = `your answer was correct! ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo', elicitSlotUpdatedIntent)
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const EndOfChallengeHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && counter === numOfQ || !skippedQ.length;
    },

    handle(handlerInput) {
        ///sending the answers somewhere
        let challengesName = global.DB.challenges.map(chall => chall.name);
        const startOfSpeech = 'you have finished the challenge, wall done!';


        if (challengesName.length) {
            let challList = createStrList(challengesName);
            const reprompt = 'would you like to move to another challenge?'
            const speechOutput = `you have another challenges for you- ${challList}./ 
            ${reprompt}`

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
        }
    }
};


function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}


function getCurrentQuestIndex(at) {
    let qIndex;
    if (at.counter === at.numOfQ) qIndex = at.skippedQ.shift();
    else {
        at.counter++;
        qIndex = at.counter;
    }

    return [
        qIndex,
        at.counter === at.numOfQ,
        at
    ];
}

module.exports = {
    FirstAnswerhandler,
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    NextQuestionHandler,
    ExitSkillHandler,
    EndOfChallengeHandler
};









// const ConfirmAnswerHandler = {
//     canHandle(handlerInput) {
//         let answerSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'answer')

//         return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === "AnswerIntent"
//             && answerSlot
//             && answerSlot.confirmationStatus === 'CONFIRMED';


//     },
//     handle(handlerInput) {
//         const { name: challengeName, questions } = global.DB.currChall
//         const at = handlerInput.attributesManager.getSessionAttributes();



//         return handlerInput.responseBuilder
//             .addElicitSlotDirective('skipOrAnswer',
//                 {
//                     name: 'AnswerIntent',
//                     confirmationStatus: 'NONE',
//                     slots: {}
//                 })
//             .speak(speechOutput)
//             .reprompt(reprompt)
//             .getResponse();
//     }
// };


