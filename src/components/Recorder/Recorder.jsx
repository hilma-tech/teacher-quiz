import React, { Component, useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { ReactMic } from 'react-mic';

import { Button, ButtonGroup } from '@material-ui/core';
import './Recorder.scss'
import AWS from 'aws-sdk';
import dotenv from 'dotenv'
dotenv.config()

// AWS.config.update({
//   signatureVersion: 'v4',
//   region: 'eu-west-3',
//   accessKeyId: process.env.aws_access_key_id,
//   secretAccessKey: process.env.aws_secret_access_key
// });


// const s3 = new AWS.S3();
// const Mp3Recorder = new MicRecorder({ bitRate: 128 });


export default function Recorder() {
  const [recorder, setRecorder] = useState({});

  useEffect(() => {
    (async () => {
      const recorder = await recordAudio();
      setRecorder(recorder);
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

    })()

  }, [])

  const recordAudio = () =>
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", (event) => {
            if (!audioChunks.length) resolve({});
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });
          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });

  // const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  return (
    <div>
      <button onClick={recorder.start}>start</button>
      <button onClick={async () => {
        const lala = await recorder.stop()
        lala.play();
      }}>stop</button>
    </div>
  )
}

// export default function Recorder(props) {

//   const [record, setRecord] = useState(false);

//   const startRecording = () => setRecord(true);
//   const stopRecording = () => setRecord(false);

//   const onData=(recordedBlob)=> {
//     console.log('chunk of real-time data is: ', recordedBlob);
//   }

//   const onStop=(recordedBlob)=> {
//     console.log('recordedBlob is: ', recordedBlob);
//   }

//     return (
//       <div>
//         <ReactMic
//           record={record}
//           className="sound-wave"
//           onStop={onStop}
//           onData={onData}
//           strokeColor="#11ABB9"
//           backgroundColor="rgba(0,0,0,0)" />
//         <button onClick={startRecording} type="button">Start</button>
//         <button onClick={stopRecording} type="button">Stop</button>
//       </div>
//     );
// }

// export default class Recorder extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isRecording: false,
//       blobURL: '',
//       isBlocked: false,
//       isRecorded: false,
//       bufferData: ''
//     }
//   }

//   componentDidMount() {
//     navigator.getUserMedia({ audio: true },
//       () => {
//         console.log('Permission Granted');
//         this.setState({ isBlocked: false });
//       },
//       () => {
//         console.log('Permission Denied');
//         this.setState({ isBlocked: true })
//       },
//     );
//   }

//   start = () => {
//     if (this.state.isBlocked) {
//       console.log('Permission Denied');
//     } else {
//       Mp3Recorder
//         .start()
//         .then(() => {
//           this.setState({ isRecording: true });
//         }).catch((e) => console.error(e));
//     }
//   };

//   stop = () => {
//     Mp3Recorder
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const blobURL = URL.createObjectURL(blob)
//         const bufferData = Buffer.from(buffer, 'binary')
//         this.setState({ blobURL, bufferData, isRecording: false, isRecorded: true });
//       }).catch((e) => console.log(e));
//   };

//   uploadFile = ({ body }) => {

//     return s3.upload({
//       Bucket: 'tts-hb-translator', // pass your bucket name
//       Key: this.state.blobURL + '.mp3',
//       Body: body,
//       ACL: "public-read"
//     }).promise()
//   };


//   render() {
//     return (
//       <div className={`recorder ${this.props.addedClasses}`}>
//         <audio src={this.state.blobURL} controls="controls" />

//         <ButtonGroup variant="contained">
//           <Button
//             onClick={this.start}
//             disabled={this.state.isRecording}>
//             Record</Button>

//           <Button
//             onClick={this.stop}
//             disabled={!this.state.isRecording}>
//             Stop</Button>

//           <Button
//             onClick={this.uploadFile}
//             disabled={!this.state.isRecorded}>
//             Upload</Button>
//         </ButtonGroup>
//       </div>
//     )
//   }
// }



