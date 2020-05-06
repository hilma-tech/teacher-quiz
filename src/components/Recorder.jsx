import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
// import './scss/App.scss';
import '../styles/components/Recorder.scss'
import AWS from 'aws-sdk';
import dotenv from 'dotenv'
dotenv.config()

AWS.config.update({
  signatureVersion: 'v4',
  region: 'eu-west-3',
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});

import { Button, ButtonGroup } from '@material-ui/core';

const s3 = new AWS.S3();
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecorded: false,
      bufferData: ''
    }
  }

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        const bufferData = Buffer.from(buffer, 'binary')
        this.setState({ blobURL, bufferData, isRecording: false, isRecorded: true });
      }).catch((e) => console.log(e));
  };

<<<<<<< HEAD:src/Recorder.jsx
    uploadFile = () => {
      console.log("buffer type", Buffer.isBuffer(this.state.bufferData));
      return s3.upload({
          Bucket: 'tts-hb-translator', // pass your bucket name
          Key: 'record1.mp3',
          Body: this.state.bufferData,
          ACL: "public-read"
      }).promise()
  };

//   var AWS = require('aws-sdk'),
//     fs = require('fs');

// // For dev purposes only
// AWS.config.update({ accessKeyId: '...', secretAccessKey: '...' });

// // Read in the file, convert it to base64, store to S3
// fs.readFile('del.txt', function (err, data) {
//   if (err) { throw err; }

//   var base64data = new Buffer(data, 'binary');

//   var s3 = new AWS.S3();
//   s3.client.putObject({
//     Bucket: 'banners-adxs',
//     Key: 'del2.txt',
//     Body: base64data,
//     ACL: 'public-read'
//   },function (resp) {
//     console.log(arguments);
//     console.log('Successfully uploaded package.');
//   });

// });
  
=======
  uploadFile = ({ body }) => {

    return s3.upload({
      Bucket: 'tts-hb-translator', // pass your bucket name
      Key: this.state.blobURL + '.mp3',
      Body: body,
      ACL: "public-read"
    }).promise()
  };

>>>>>>> 4fb9f0f2aa31f47403d3738a3c2f665c3c20bdef:src/components/Recorder.jsx

  render() {
    return (
      <div className={`recorder ${this.props.addedClasses}`}>
        <audio src={this.state.blobURL} controls="controls" />

        <ButtonGroup variant="contained">
          <Button
            onClick={this.start}
            disabled={this.state.isRecording}>
            Record</Button>

          <Button
            onClick={this.stop}
            disabled={!this.state.isRecording}>
            Stop</Button>

          <Button
            onClick={this.uploadFile}
            disabled={!this.state.isRecorded}>
            Upload</Button>
        </ButtonGroup>
      </div>
    )
  }
}


export default Recorder;

