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
    NextQuestionHandler,
    ExitSkillHandler,
    EndOfChallengeHandler
} = require('./AnswerIntent');
const SelectChallengeIntent = require('./SelectChallengeIntent');



module.exports = {
    intentHandlers: [
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        SelectChallengeIntent,
        FirstAnswerhandler,
        SkipOrAnswerHandler,
        AnswerProcessingHandler,
        NextQuestionHandler,
        ExitSkillHandler,
        EndOfChallengeHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    ],
    errorHandler: ErrorHandler
}