import React, { Component } from 'react';
import AlexaRecorder from './Recorder';
import './styles/scss/answers.scss';
import './styles/css/answers.css';

class AnswersAndRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: { value: '' }
        }
    }

    handleAnswer = (event) => {
        let answer = this.state.answer
        answer.value = event.target.value
        this.setState({ answer })
    }

    render() {
        return (
            <div className="answers">
                <div className="main">
                    <h1 className="title">the recorder section</h1>
                    <div className="recorder">
                        <AlexaRecorder />
                    </div>
                    <input
                        className="input-answer"
                        pattern="[A-Za-z]" //doen't work :/
                        type="text"
                        placeholder="type here your answer"
                        onChange={this.handleAnswer}
                    >
                    </input>
                </div>
            </div>
        )
    }
}


export default AnswersAndRecords