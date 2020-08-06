const Alexa = require('ask-sdk-core');
const handlers = require('./intentHandlers/index');

global.store = require('./store');
global.Alexa = require('ask-sdk-core');

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(...handlers.intentHandlers)
    .addErrorHandlers(handlers.errorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
