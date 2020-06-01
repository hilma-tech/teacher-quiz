const {
    FirstAnswerhandler,
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    NextQuestionHandler
} = require('../intentHandlers/ChallengeIntent');

const handlerInput = require('./requests/skipOrAnswer_request.json');


SkipOrAnswerHandler.handle(handlerInput);