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
    const ifLast = at.counter === at.numOfQ || (at.counter === at.numOfQ && !at.answeredQ.includes(false));

    const reprompt = createQReprompt(qText, ifLast)
    const speechOutput = `${isSkippingQ ? SKIP_THIS_Q : ''} ${isSkippedQuest ? SKIPPED_Q : ORDER_Q} ${qIndex}. ${reprompt}`;

    return [
        speechOutput,
        reprompt,
        _at,
        isSkippedQuest
    ]
}

///////////////////
//inner functions//
///////////////////
function getCurrentQuestIndex(at) {
    let qIndex;

    const isSkippedQuest = (at.counter === at.numOfQ)
        && at.answeredQ.findIndex(q => !q);

    if (at.counter < at.numOfQ) {
        if (at.numOfQ === 1) qIndex = at.counter;
        else at.counter++;
        qIndex = at.counter;
    }
    else qIndex = isSkippedQuest + 1;

    return [
        qIndex,
        Number.isInteger(isSkippedQuest),
        at
    ];
}

module.exports = {
    createStrList,
    createQReprompt,
    createQResponse,
    getCurrentQuestIndex
}