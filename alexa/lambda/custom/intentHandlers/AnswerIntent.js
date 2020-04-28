const Alexa = require('ask-sdk-core');
const {
    str: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q,
        START_OF_REPROMPT,
        ANSWER_OR_SKIP_QUEST
    },
    fn: { createQReprompt }

} = require('../constStr').str;

const FirstAnswerhandler = {
    handle(handlerInput) {
        const { name: challengeName, questions } = global.DB.currChall
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        let addedAttributes = {
            counter: 1,
            skippedQ: [],
            numOfQ: Object.keys(questions).length
        }

        handlerInput.attributesManager.setSessionAttributes({ ...attributes, ...addedAttributes });
        const currQ = questions[1].qText;

        const reprompt = createQReprompt(currQ);
        const speechOutput = `you choose ${challengeName} challenge. starting from question number 1. ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('skipOrAnswer',
                {
                    name: 'AnswerIntent',
                    confirmationStatus: 'NONE',
                    slots: {}
                })
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};




function skipStr({ attributes: at }) {
    let reprompt, speechOutput;
    if (at.counter === at.numOfQ) {
        const qIndex = at.skippedQ.shift();
        const { qText } = global.DB.currChall.questions[qIndex];

        reprompt = createQReprompt(qText);
        speechOutput = `${SKIP_THIS_Q} ${SKIPPED_Q} ${qIndex}.${reprompt}`
    }
    else {
        at.counter++;
        const qIndex = at.counter;
        const { qText } = global.DB.currChall.questions[qIndex];

        reprompt = createQReprompt(qText);
        speechOutput = `${SKIP_THIS_Q} ${ORDER_Q} ${qIndex}.${this.reprompt}`;
    }
    return [speechOutput, reprompt];
}


const SkipOrAnswerHandler = {
    canHandle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && intentName === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
    },
    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        let skipOrAnswer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer');
        let speechOutput, reprompt;

        if (skipOrAnswer === 'answer') {
            speechOutput, reprompt = `please say the answer is, following your answer`;
        }

        else if (skipOrAnswer === 'skip') {
            at.skippedQ.push(at.counter);
            ([speechOutput, reprompt, at] = skipStr(at));
        }

        handlerInput.attributesManager.getSessionAttributes(at);

        return handlerInput.responseBuilder
            .addElicitSlotDirective(skipOrAnswer === 'skip' ? 'skipOrAnswer' : 'answer',
                {
                    name: 'AnswerIntent',
                    confirmationStatus: 'NONE',
                    slots: {
                        skipOrAnswer: {
                            name: 'skipOrAnswer',
                            confirmationStatus: 'NONE'
                        }
                    }
                })
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const AnswerProcessingHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && intentName === "AnswerIntent"
            && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        const { aText } = global.DB.currChall.questions[at.counter];
        const answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer');
        ///check if the answer was correct
        ///

        let nextQIndex;
        if (at.counter === at.numOfQ) nextQIndex = at.skippedQ.unshift();
        else {
            at.counter++;
            nextQIndex = at.counter;
        }

        handlerInput.attributesManager.getSessionAttributes(at);

        const reprompt = 'would you like to move to the next question?';
        const speechOutput = `your answer was correct! ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo',
                {
                    name: 'AnswerIntent',
                    confirmationStatus: 'NONE',
                    slots: {
                        answer: {
                            name: 'answer',
                            confirmationStatus: 'NONE'
                        }
                    }
                })
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const AnswerHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && intentName === "AnswerIntent"
            // && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
            && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        const { aText } = global.DB.currChall.questions[at.counter];
        const answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer');
        ///check if the answer was correct
        ///

        const reprompt = 'would you like to move to the next question?';
        const speechOutput = `your answer was correct! ${reprompt}`;

        return handlerInput.responseBuilder
            .addElicitSlotDirective('yesOrNo',
                {
                    name: 'AnswerIntent',
                    confirmationStatus: 'NONE',
                    slots: {
                        answer: {
                            name: 'answer',
                            confirmationStatus: 'NONE'
                        }
                    }
                })
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};


const NextQuestionHandler = {
    canHandle(handlerInput) {
        const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && intentName === "AnswerIntent"
            && Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo')
        // && counter <= numOfQ || skippedQ.length;
    },

    handle(handlerInput) {
        const at = handlerInput.attributesManager.getSessionAttributes();
        const yesOrNo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'yesOrNo');

        if (yesOrNo === 'yes') {

            let nextQIndex, reprompt, speechOutput;
            if (at.counter === at.numOfQ) {
                nextQIndex = at.skippedQ.unshift();
                const { qText } = global.DB.currChall.questions[nextQIndex];

                reprompt = createQReprompt(qIndex);
                speechOutput = `${SKIPPED_Q} ${nextQIndex}.${qText} ${reprompt}`;
            }
            else {
                at.counter++;
                nextQIndex = at.counter;
                const { qText } = global.DB.currChall.questions[nextQIndex];

                reprompt = createQReprompt(qIndex);
                speechOutput = `${ORDER_Q} ${nextQIndex}.${qText} ${reprompt}`;
            }

            handlerInput.attributesManager.getSessionAttributes(at);

            return handlerInput.responseBuilder
                .addElicitSlotDirective('skipOrAnswer',
                    {
                        name: 'AnswerIntent',
                        confirmationStatus: 'NONE',
                        slots: {
                            answer: {
                                name: 'yesOrNo',
                                confirmationStatus: 'NONE'
                            }
                        }
                    })
                .speak(speechOutput)
                .reprompt(reprompt)
                .getResponse();



        }
        else if (yesOrNo === 'no') {

        }
    }
};




// const AnswerIntent = {
//     canHandle(handlerInput) {
//         const { counter, numOfQ, skippedQ } = handlerInput.attributesManager.getSessionAttributes();
//         const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

//         return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
//             && intentName === "AnswerIntent"
//             && Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer')
//             && !Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer')
//             && counter < numOfQ || skippedQ.length;
//     },

//     handle(handlerInput) {
//         const attributes = handlerInput.attributesManager.getSessionAttributes();
//         const skipOrAnswer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'skipOrAnswer');
//         let reprompt, speechOutput;

//         let { counter, numOfQ, skippedQ, currChall } = attributes;


//         if (skipOrAnswer === 'skip') {
//             attributes.skippedQ.push(counter);
//             attributes.counter++;

//             reprompt = startOfSpeechForIfSkippedQ();
//             speechOutput = `${SKIP_THIS_Q} ${reprompt}`

//         }

//         const { questions } = currChall;

//         let qIndex;

//         //skipped question
//         const startOfSpeechForIfSkippedQ = () => {
//             if (counter === numOfQ) {
//                 qIndex = skippedQ.shift();
//                 return `${SKIPPED_Q} ${qIndex},`;
//             }
//             else {
//                 attributes.counter++;
//                 qIndex = attributes.counter;
//                 return `${ORDER_Q} ${qIndex},`;
//             }
//         }

//         const isSkippedQ = Alexa.getIntentName(handlerInput.requestEnvelope) === 'SkipQuestionIntent';
//         const currQ = questions[qIndex].qText;
//         const reprompt = `the question is, ${currQ}.\
//         would you like to answer it or skip to the next question?answer yes to answer and no to skip`;

//         return handlerInput.responseBuilder
//             .speak(`${isSkippedQ ? 'skipped this question.' : ''} ${startOfSpeech} ${reprompt}`)
//             .reprompt(reprompt)
//             .getResponse();
//     }
// };




module.exports = {
    AnswerHandler,
    FirstAnswerhandler,
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    NextQuestionHandler
};


