
let dbReceivedData = (function () {
    let instance;

    function init() {

        let challenges = [], currChall, currChallQ;
        let completeChallenges = []
        let availableChallenges = []
        let answers = {}

        // Public methods and variables (the init function return)
        return {
            get challenges() { return challenges; },
            get currChall() { return currChall; },
            get currChallQ() { return currChallQ; },
            get completeChallenges() { return completeChallenges; },
            get answers() { return answers; },
            get aChall() { return availableChallenges; },

            setChallenges(challengesArr) {
                challenges = [...challengesArr];
                availableChallenges = [...challengesArr];
            },

            setCurrChall(challengeId = undefined) {
                if (challengeId) currChall = { ...challenges[challengeId], challengeId };
                else currChall = availableChallenges[0];
            },

            setCompleteChallenges() {
                const { challengeId: id, name } = currChall;
                completeChallenges.push(challenges[id]);
                availableChallenges = availableChallenges.filter(chall => chall.name !== name);
                currChall = undefined;
            },

            setAnswers(qIndex, answer, score) {
                answers[qIndex] = { answer, score };
            }

        };
    };

    return {
        getInstance: function () {

            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();


module.exports = dbReceivedData;







