//questions re

const ORDER_Q = 'moving to question number';
const SKIPPED_Q = 'coming back to question number';
const SKIP_THIS_Q = 'skipping to the next question.';
const START_OF_REPROMPT = `the question is,`;
const ANSWER_OR_SKIP_QUEST = 'would you like to answer it or skip to the next question';

const elicitSlotUpdatedIntent = {
    name: 'AnswerIntent',
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
        exitYesOrNo:{
            name:'exitYesOrNo',
            confirmationStatus: 'NONE'
        }
    }
}

const createQReprompt = (qText) => `${START_OF_REPROMPT} ${qText}.${ANSWER_OR_SKIP_QUEST}`;


module.exports = {
    str: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q,
        START_OF_REPROMPT,
        ANSWER_OR_SKIP_QUEST
    },
    obj: {
        elicitSlotUpdatedIntent
    },
    fn: {
        createQReprompt
    }
}