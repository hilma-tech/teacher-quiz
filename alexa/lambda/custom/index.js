/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales

const LaunchRequestHandler = require('./intentHandlers/LaunchRequestHandler');
const HelloWorldIntentHandler = require('./intentHandlers/HelloWorldIntentHandler');
const HelpIntentHandler = require('./intentHandlers/HelpIntentHandler');
const CancelAndStopIntentHandler = require('./intentHandlers/CancelAndStopIntentHandler');
const FallbackIntentHandler = require('./intentHandlers/FallbackIntentHandler');
const SessionEndedRequestHandler = require('./intentHandlers/SessionEndedRequestHandler');
const IntentReflectorHandler = require('./intentHandlers/IntentReflectorHandler');
const ErrorHandler = require('./intentHandlers/ErrorHandler');

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
