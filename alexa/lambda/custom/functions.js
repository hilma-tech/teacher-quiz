const {
    START_OF_REPROMPT,
    ANSWER_OR_SKIP_QUEST,
    ANSWER_OR_SKIP_LAST_Q_QUEST,
    SKIP_THIS_Q,
    SKIPPED_Q,
    ORDER_Q
} = require('./constStr').quest;

const store = require('./store').getInstance();


function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}

function createQReprompt(qText, ifLast = false) {
    return `${START_OF_REPROMPT} ${qText}.${ifLast ? ANSWER_OR_SKIP_LAST_Q_QUEST : ANSWER_OR_SKIP_QUEST}`
}

function createQResponse(at, isSkippingQ = false) {
    const [qIndex, isSkippedQuest, _at] = getCurrentQuestIndex(at);

    const { qText } = store.currChall.questions[qIndex];
    const ifLast = at.counter === at.numOfQ || (at.counter === at.numOfQ && !at.skippedQ.length);

    const reprompt = createQReprompt(qText, ifLast)
    const speechOutput = `${isSkippingQ ? SKIP_THIS_Q : ''} ${isSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}. ${reprompt}`;

    return [
        speechOutput,
        reprompt,
        _at
    ]
}

///////////////////
//inner functions//
///////////////////
function getCurrentQuestIndex(at) {
    let qIndex;
    const isSkippedQuest = at.counter === at.numOfQ;

    if (isSkippedQuest === at.numOfQ && at.numOfQ - 1 && at.skippedQ.length) {
        qIndex = at.skippedQ.shift();
    }
    else if (at.counter < at.numOfQ || !at.numOfQ - 1) {
        if (at.numOfQ - 1) at.counter++;
        qIndex = at.counter;
    }

    return [
        qIndex,
        isSkippedQuest,
        at
    ];
}



module.exports = {
    createStrList,
    createQReprompt,
    createQResponse,
    getCurrentQuestIndex
}