const {
    FirstAnswerhandler,
    SkipOrAnswerHandler,
    AnswerProcessingHandler,
    NextQuestionHandler
} = require('../intentHandlers/AnswerIntent');

const handlerInput = require('./requests/skipOrAnswer_request.json');


SkipOrAnswerHandler.handle(handlerInput);