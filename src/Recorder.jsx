import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import './App.css';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AlexaRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecorded: false
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
        this.setState({ blobURL, isRecording: false, isRecorded: true });
      }).catch((e) => console.log(e));
  };

    uploadFile = ({ body }) => {

      return s3.upload({
          Bucket: 'tts-hb-translator', // pass your bucket name
          Key: this.state.blobURL + '.mp3',
          Body: body,
          ACL: "public-read"
      }).promise()
  };
  

  render() {
    return (
      <div>
        <button onClick={this.start} disabled={this.state.isRecording}>
          Record
        </button>
        <button onClick={this.stop} disabled={!this.state.isRecording}>
          Stop
        </button>
        <button onClick={this.uploadFile} disabled={!this.state.isRecorded}>
          Upload
        </button>
        <audio src={this.state.blobURL} controls="controls" />
      </div>
    )
  }
}


export default AlexaRecorder;

