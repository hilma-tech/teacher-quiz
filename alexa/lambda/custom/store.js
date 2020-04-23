
let dbReceivedData = (function () {
    let instance;

    function init() {

        let challenges = [], currChall, currChallQ;

        // Public methods and variables (the init function return)
        return {
            get challenges() { return challenges; },
            get currChall() { return currChall; },
            get currChallQ() { return currChallQ; },

            setChallenges(challengesArr) {
                challenges = challengesArr;
            },

            setCurrChall(currentChallenge) {
                currChall = currentChallenge;
            },

            setCurrChallQ(currentChallengeQuestions) {
                currChallQ = currentChallengeQuestions;
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







