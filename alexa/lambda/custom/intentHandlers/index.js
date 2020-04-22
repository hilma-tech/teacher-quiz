const LaunchRequestHandler = require('./LaunchRequestHandler');
const HelloWorldIntentHandler = require('./HelloWorldIntentHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./FallbackIntentHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');
const ErrorHandler = require('./ErrorHandler');
const StartChallengeIntent = require('./startChallengeIntent');
const AnswerIntent = require('./AnswerIntent');
const EndOfChallengeHandlar = require('./EndOfChallengeHandlar');

module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        StartChallengeIntent,
        AnswerIntent,
        EndOfChallengeHandlar,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}