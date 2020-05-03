
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
                challenges = challengesArr;
                availableChallenges = challenges;
            },

            setCurrChall(challengeId) {
                currChall = { ...challenges[challengeId], id: challengeId };
            },

            setCompleteChallenges() {
                const { id } = currChall;
                completeChallenges.push(challenges[id]);
                availableChallenges.splice(id, 1);
            },

            setAnswers(qIndex, answer, score) {
                answers[qIndex] = { answer, score };
            }

        };
    };

    //the class function return
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();


module.exports = dbReceivedData;







