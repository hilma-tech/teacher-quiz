
let dbReceivedData = (function () {
    let instance;

    function init() {

        let challenges = [], currChall, currChallQ;
        let answers = {}

        // Public methods and variables (the init function return)
        return {
            get challenges() { return challenges; },
            get currChall() { return currChall; },
            get currChallQ() { return currChallQ; },
            get answers() { return answers; },

            setChallenges(challengesArr) {
                challenges = challengesArr;
            },

            setCurrChall(challengeId) {
                currChall = challenges[challengeId];
            },

            setCurrChallQ(currentChallengeQuestions) {
                currChallQ = currentChallengeQuestions;
            },

            setAnswers(qIndex, answer, score) {
                answers[qIndex] = answer;
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







