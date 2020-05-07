const {
    quest: {
        START_OF_REPROMPT,
        ANSWER_OR_SKIP_QUEST
    }
} = require('./constStr');


function createStrList(arr) {
    const last = arr.pop();
    return arr.join(', ') + (arr.length ? ' and ' : '') + last
}

function createQReprompt(qText) { return `${START_OF_REPROMPT} ${qText}.${ANSWER_OR_SKIP_QUEST}` };

function getCurrentQuestIndex(at) {
    let qIndex, prevCounter = at.counter;
    if (at.counter === at.numOfQ) {
        if (at.skippedQ.length) qIndex = at.skippedQ.shift();
    }
    else if (at.counter < at.numOfQ) {
        at.counter++;
        qIndex = at.counter;
    }

    return [
        qIndex,
        prevCounter === at.numOfQ,
        at
    ];
}




module.exports = {
    createStrList,
    createQReprompt,
    getCurrentQuestIndex
}