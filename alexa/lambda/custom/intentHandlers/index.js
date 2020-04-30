const LaunchRequestHandler = require('./LaunchRequestHandler');
const HelloWorldIntentHandler = require('./HelloWorldIntentHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./FallbackIntentHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');
const ErrorHandler = require('./ErrorHandler');
const {
    FirstAnswerhandler,
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    NextQuestionHandler
} = require('./AnswerIntent');
const EndOfChallengeHandlar = require('./EndOfChallengeHandlar');
// const WantToAnswerIntent = require('./WantToAnswerIntent');
const SelectChallengeIntent = require('./SelectChallengeIntent')


module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        SelectChallengeIntent,
        SkipOrAnswerHandler,
        AnswerProcessingHandler,
        NextQuestionHandler,
        FirstAnswerhandler,
        // AnswerIntent,
        // EndOfChallengeHandlar,
        // WantToAnswerIntent,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}