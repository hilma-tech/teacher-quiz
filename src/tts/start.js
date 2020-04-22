import Speech from 'speak-tts';

const speech = new Speech() // will throw an exception if not browser supported
if(speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}

const speech = new Speech()
speech.init().then((data) => {
    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
})

// Example with full conf 
Speech.init({
    'volume': 1,
     'lang': 'en-GB',
     'rate': 1,
     'pitch': 1,
     'voice':'Google UK English Male',
     'splitSentences': true,
     'listeners': {
         'onvoiceschanged': (voices) => {
             console.log("Event voiceschanged", voices)
         }
     }
})

speech.speak({
    text: 'Hello, how are you today ?',
}).then(() => {
    console.log("Success !")
}).catch(e => {
    console.error("An error occurred :", e)
})

speech.speak({
    text: 'Hello, how are you today ?',
    queue: false, // current speech will be interrupted,
    listeners: {
        onstart: () => {
            console.log("Start utterance")
        },
        onend: () => {
            console.log("End utterance")
        },
        onresume: () => {
            console.log("Resume utterance")
        },
        onboundary: (event) => {
            console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
        }
    }
}).then(() => {
    console.log("Success !")
}).catch(e => {
    console.error("An error occurred :", e)
})

//Set language (note that the language must be supported by the client browser):
Speech.setLanguage('en-US')

//Set the voice (note that the voice must be supported by the client browser):
Speech.setVoice('Fiona') // you can pass a SpeechSynthesisVoice as returned by the init() function or just its name

//Set the rate:
Speech.setRate(1) 

//Set the volume:
Speech.setVolume(1) 

//Set the pitch:
Speech.setPitch(1) 

//Pause talking in progress:
Speech.pause()

//Resume talking in progress:
Speech.resume()

//Cancel talking in progress:
Speech.cancel()

// Get boolean indicating if the utterance queue contains as-yet-unspoken utterances:
Speech.pending()

// Get boolean indicating if talking is paused:
Speech.paused()

//Get boolean indicating if talking is in progress:
Speech.speaking()
