const LaunchRequestHandler = require('./LaunchRequestHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./FallbackIntentHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const ErrorHandler = require('./ErrorHandler');
const AIHandlars = require('./ChallengeIntentHandlars/index.js');



module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelpIntentHandler,
        ...AIHandlars,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}