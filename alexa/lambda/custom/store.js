const challengesArr = require('../../../teacherData/questionTemplate.json');

const yesNo = [
    { name: { value: "yes", synonyms: ["yep", "yeah"] } },
    { name: { value: "no", synonyms: ["nope", "I do not", "no thank you"] } }
]

class Store {

    challenges = [];
    currChall = {};
    compChalls = [];
    availChalls = [];
    answers = {};
    lastQ = false;

    get lastQ() { return lastQ; }


    getChallenges() {
        this.challenges = [...challengesArr];
        this.availChalls = [...challengesArr];
    }

    setCurrChall(challengeId = undefined) {
        if (challengeId) this.currChall = { ...this.challenges[challengeId], challengeId };
        else this.currChall = this.availChalls[0];
    }

    addCompChall() {
        const { challengeId: id, name } = this.currChall;
        this.compChalls.push(this.challenges[id]);
        this.availChalls = this.availChalls.filter(chall => chall.name !== name);
        this.currChall = undefined;
    }


    setAnswers(qIndex, answer, score) {
        this.answers[qIndex] = { answer, score };
    }

    getChallAsSlotVal() {
        const slotValues = this.challenges
            .map(({ name }, id) => ({ id, name: { value: name } }));
        return [...slotValues, ...yesNo];
    }


}



getInstance = () => {
    let ins;
    if (!ins) ins = new Store();
    return ins;
}


module.exports = getInstance();







