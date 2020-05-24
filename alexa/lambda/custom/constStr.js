//launch request
const LAUNCH_OPENING = 'welcome to the amazing teacher quiz. ';
const ONE_CHALLENGE = 'do you want to start the challenge?';
const SEVERAL_CHALLENGES = 'please say the name of the challenge you want to start.'


//questions responses
const ORDER_Q = 'moving to question number';
const SKIPPED_Q = 'coming back to question number';
const SKIP_THIS_Q = 'skipping to the next question.';
const START_OF_REPROMPT = `the question is,`;
const ANSWER_OR_SKIP_QUEST = 'would you like to skip to the next question?';
const ANSWER_OR_SKIP_LAST_Q_QUEST='would you like to skip it?';
const LAST_Q = 'its your last question';
const MOVE_TO_NEXT_Q_QUEST = 'would you like to move to the next question?';
const GO_BACK_TO_SKIPPED_Q = 'you finished all your questions. however you skipped some of them. would you like to come back and answer them?'

//exit skill responses
const EXIT_GREETING = 'i will save your progress. see you soon!'

const elicitSlotUpdatedIntent = {
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
}


module.exports = {
    quest: {
        ORDER_Q,
        SKIPPED_Q,
        SKIP_THIS_Q,
        START_OF_REPROMPT,
        ANSWER_OR_SKIP_QUEST,
        ANSWER_OR_SKIP_LAST_Q_QUEST,
        MOVE_TO_NEXT_Q_QUEST,
        GO_BACK_TO_SKIPPED_Q,
        LAST_Q
    },

    launch: {
        LAUNCH_OPENING,
        ONE_CHALLENGE,
        SEVERAL_CHALLENGES,
    },

    exit: { EXIT_GREETING },
    obj: {
        elicitSlotUpdatedIntent
    }
}