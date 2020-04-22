import React, { Component } from 'react';
import Speech from 'speak-tts';

const speech = new Speech() // will throw an exception if not browser supported
// if (speech.hasBrowserSupport()) { // returns a boolean
//     console.log("speech synthesis supported")
// }

// const speech = new Speech()
// speech.init().then((data) => {
//     // The "data" object contains the list of available voices and the voice synthesis params
//     console.log("Speech is ready, voices are available", data)
// }).catch(e => {
//     console.error("An error occured while initializing : ", e)
// })

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }

    check = () =>{
        this.initSpeech(this.speak)
    }

    initSpeech = (cb) =>{
        if (speech.hasBrowserSupport()) { // returns a boolean
            console.log("speech synthesis supported")
            speech.init({
                'volume': 1,
                 'lang': 'he-IL',
                 'rate': 1,
                 'pitch': 1,
                 'voice':'Google UK English Male',
                 'splitSentences': true,
                 'listeners': {
                     'onvoiceschanged': (voices) => {
                         console.log("Event voiceschanged", voices)
                     }
                 }
            }).then((data) => {
                cb&&cb()
                // The "data" object contains the list of available voices and the voice synthesis params
                console.log("Speech is ready, voices are available", data)
            }).catch(e => {
                console.error("An error occured while initializing : ", e)
            })
        }
    }



    componentDidMount() {
        console.log('inside did mount');
      
    }


    speak = () =>{
        this.initSpeech()
        speech.setVoice('Google UK English Female')
        speech.setLanguage('he-IL')

        speech.speak({
            text: 'שלום',
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
    }

    render() {
        return (
            <div>
                <h1>test</h1>
                <button onClick={this.check}>try me</button>
            </div>
        )
    }
}

export default Test;