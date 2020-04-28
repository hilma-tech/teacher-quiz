const LaunchRequestHandler = require('./LaunchRequestHandler');
const HelloWorldIntentHandler = require('./HelloWorldIntentHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./FallbackIntentHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');
const ErrorHandler = require('./ErrorHandler');
const StartChallengeIntent = require('./startChallengeIntent');
const { AnswerIntent, FirstAnswerhandler } = require('./AnswerIntent');
const EndOfChallengeHandlar = require('./EndOfChallengeHandlar');
// const WantToAnswerIntent = require('./WantToAnswerIntent');
const SelectChallengeIntent = require('./SelectChallengeIntent')


module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        SelectChallengeIntent,
        FirstAnswerhandler,
        // StartChallengeIntent,
        AnswerIntent,
        // EndOfChallengeHandlar,
        // WantToAnswerIntent,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}