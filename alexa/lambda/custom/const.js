const store = require('./store');
const { EndOfChallengeHandler, ExitSkill } = require('./intentHandlers/ChallengeIntentHandlars/Handlers');


const launch = Object.freeze({
    ONE_CHALLENGE: 'do you want to start the challenge?',
    SEVERAL_CHALLENGES: 'please say the name of the challenge you want to start.',

    speak() {
        store.getChallenges();
        const { ONE_CHALLENGE, SEVERAL_CHALLENGES } = launch

        const cSum = Object.keys(store.challenges).length;
        const listOfCNames = createStrList(store.challenges.map(({ name }) => name));

        const reprompt = `you have ${cSum} challenges available, ${listOfCNames}.\
        ${cSum === 1 ? ONE_CHALLENGE : SEVERAL_CHALLENGES}`;

        const speechOutput = `welcome to the amazing teacher quiz.\
        ${reprompt}`

        return [speechOutput, reprompt];
    }
});



const quest = Object.freeze({
    ORDER_Q: 'moving to question number',
    SKIPPED_Q: 'coming back to question number',
    SKIP_THIS_Q: 'skipping to the next question.',
    START_OF_REPROMPT: `the question is,`,
    ANSWER_OR_SKIP_QUEST: 'would you like to skip to the next question?',
    ANSWER_OR_SKIP_LAST_Q_QUEST: 'would you like to skip it?',
    LAST_Q: 'its your last question',
    MOVE_TO_NEXT_Q_QUEST: 'would you like to move to the next question?',
    // GO_BACK_TO_SKIPPED_Q: 'you finished all your questions. however you skipped some of them. would you like to come back and answer them?',

    //get speechOutPut and reprompt for each handler 
    firstQuest(qSum) {
        const { name: cName, questions: { 1: { qText } } } = store.currChall
        console.log('qText: ', qText);

        const reprompt = quest.getReprompt(qText);
        const speechOutput = `you have chosen ${cName} challenge.\
        you have ${qSum} questions in this challenge. starting question number 1.\
         ${reprompt}`;

        return [speechOutput, reprompt];
    },

    AnswerProcessing(aScore) {
        const reprompt = quest.MOVE_TO_NEXT_Q_QUEST;
        const speechOutput = `${aScore} ${reprompt}`;

        return [speechOutput, reprompt];
    },

    nextQuest(currYesOrNo, att, goBackToSkippedQ) {
        let speechOutput, reprompt, slotToElicit;

        if (currYesOrNo === 'yes') {
            if (!att) { return console.log('need to pass att') }

            if (goBackToSkippedQ) {
                att.counter = 0;
                att.currLastQ = undefined;
            }
            slotToElicit = 'answer';
            ([speechOutput, reprompt] = quest.createQResponse(att));
        }
        else if (currYesOrNo === 'no') {
            speechOutput = reprompt = 'do you want to exit this skill?'
            slotToElicit = 'exitYesOrNo';
        }

        return [speechOutput, reprompt, slotToElicit];
    },

    //general funcs
    getReprompt(qText) {
        return `${quest.START_OF_REPROMPT} ${qText}.`
    },

    createQResponse(att) {
        const { getReprompt, SKIPPED_Q, ORDER_Q } = quest;
        quest.getCurrentQuestIndex(att);
        const { qText } = store.currChall.questions[att.counter];

        const reprompt = getReprompt(qText)
        const speechOutput = `${att.skipMode ? SKIPPED_Q : ORDER_Q} ${att.counter}. ${reprompt}`;

        return [
            speechOutput,
            reprompt
        ]
    },

    getCurrentQuestIndex(att) {
        let prevCounter = att.counter;

        if (att.skipMode) {
            let max = null, currLastQ = null;
            for (const q in att.answeredQ) {
                if (+q > att.counter && !max) max = q;
                if (!att.answeredQ[q]) currLastQ = q;
            }

            att.counter = max || att.counter;
            if (!att.currLastQ) att.currLastQ = currLastQ;
        }
        else if (att.qSum !== 1 && att.counter < att.qSum) att.counter++;
        else return;

        store.lastQ = (prevCounter === att.currLastQ);
    }
});



const exit = Object.freeze({
    SEVERAL_CHALL_AVAIL: 'which challenge would you like to start?',
    ONE_CHALL_AVAIL: 'you want to start it?',

    exit(ifYes, att) {
        let speechOutput, reprompt, slotToElicit, updateSlotsInElicit;
        //if you finished the challenges
        if (att.counter === att.currLastQ) {
            const aChallList = createStrList(store.availChalls.map(({ name }) => name));
            const cNum = store.availChalls.length;

            slotToElicit = 'challengeName';
            updateSlotsInElicit = clearChallName;
            speechOutput = reprompt = `you currently have ${cNum} available challenge - ${aChallList}.\
                 ${cNum === 1 ? exit.ONE_CHALL_AVAIL : exit.SEVERAL_CHALL_AVAIL}`
        }
        // in the middle of challenge.between questions.
        else {
            //saving the progress in the challenges
            ([speechOutput, reprompt] = quest.createQResponse(att));
            slotToElicit = 'answer';
            updateSlotsInElicit = clearChallSlots;
        }

        return [speechOutput, reprompt, slotToElicit, updateSlotsInElicit];
    }
});


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

const clearChallName = Object.freeze({
    name: 'SelectChallengeIntent',
    confirmationStatus: 'NONE',
    slots: {}
})

module.exports = Object.freeze({
    launch,
    quest,
    exit,
    updateSlotsInElicit: {
        clearChallName,
        clearChallSlots
    }
});


function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}
