import React, { Component, useState, useEffect, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { ReactMic } from 'react-mic';
import { StopOutlined, Clear } from '@material-ui/icons';
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



// export default function Recorder(props) {
//   const [level, setLevel] = useState(1);
//   const [record, setRecord] = useState(false);

//   useEffect(() => {
//     // console.log('record in effects',record)
//     // start  Recording()
//   }, [record])

//   const onData = (recordedBlob) => {
//     console.log('chunk of real-time data is: ', recordedBlob);
//   }

//   const onStop = (recordedBlob) => {
//     console.log('recordedBlob is: ', recordedBlob);
//     const blob=new Blob(recordedBlob)
//     const file = new File(blob);
//     console.log('file: ', file);
//   }

//   const startRecording = () => {
//     console.log('immm hereee')
//     setRecord(true);
//     setLevel(2);
//   }

//   const stopRecording = () => {
//     setRecord(false);
//     setLevel(3);
//   }

//   const LevelIcon = (() => {
//     switch (level) {
//       case 1: return <Lvl1Icon {...{ startRecording }} />
//       case 2: return <Lvl2Icon {...{ stopRecording }} />
//       case 3: return <Lvl3Icon {...{ onStop }} />
//       default: return;
//     }
//   })()


//   return (
//     <div className='recorder'>
//       <p className='record__p'>Record the question</p>
//       {LevelIcon}

//       <ReactMic
//         record={record}
//         className="sound-wave"
//         height={level === 2 ? 100 : 0}
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#11ABB9"
//         backgroundColor="#ffffff00" />
//     </div>
//   );
// }


// const Lvl1Icon = ({ startRecording, setLevel }) => {
//   return <img
//     onClick={
//       startRecording
//       // () => setLevel(2)
//     }
//     className='lvl1__img'
//     src='images/recordIcon.svg'
//     alt='record' />
// }

// const Lvl2Icon = ({ stopRecording }) => {
//   return (
//     <div className='stop-btn' onClick={stopRecording}>
//       <StopOutlined />
//     </div>
//   );
// }

// const Lvl3Icon = () => {
//   return (
//     <>
//       <div className='lvl3__speaker'>
//         <img
//           src='images/speaker.svg'
//         />
//       </div>

//       <div className='lvl3__delete'>
//         <Clear />
//       </div>

//     </>
//   )
// }


