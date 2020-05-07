const LaunchRequestHandler = require('./LaunchRequestHandler');
const HelloWorldIntentHandler = require('./HelloWorldIntentHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./FallbackIntentHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');
const ErrorHandler = require('./ErrorHandler');
const AIHandlars = require('./ChallengeIntentHandlars/ChallHandlerIndex.js');



module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        ...AIHandlars,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}