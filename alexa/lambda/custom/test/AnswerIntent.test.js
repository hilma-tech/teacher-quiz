const IHelloWorld = require('../intentHandlers/AnswerIntent.js');

describe('Answer intent handlers', () => {

    let requestEnvelope = require('./requests/skipOrAnswer_request.json');

    let speakMock = jest.fn(() => handlerInput.responseBuilder);
    let getResponseMock = jest.fn(() => handlerInput.responseBuilder);

    let handlerInput = {
        responseBuilder: {
            speak: speakMock,
            getResponse: getResponseMock
        },
        requestEnvelope
    };

    it('canHandle', () => {
        expect(IHelloWorld.canHandle(handlerInput)).toEqual(true);
    });


    it('should greet the user with a message', () => {
        IHelloWorld.handle(handlerInput);
        // expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith('hello world');
    });

});