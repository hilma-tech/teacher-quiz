const IHelloWorld = require('../intentHandlers/HelloWorldIntentHandler');

describe('HelloWorldIntentHandler', () => {

    let requestEnvelope = require('./requests/intent_request_helloWorld');

    let speakMock = jest.fn(() => handlerInput.responseBuilder);
    let getResponseMock = jest.fn(() => handlerInput.responseBuilder);

    let handlerInput = {
        responseBuilder: {
            speak: speakMock,
            getResponse: getResponseMock
        },
        requestEnvelope
    };

    it('should be able to handle requests', () => {
        expect(IHelloWorld.canHandle(handlerInput)).toEqual(true);
    });


    it('should greet the user with a message', () => {
        IHelloWorld.handle(handlerInput);
        expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith('hello world');
    });

});