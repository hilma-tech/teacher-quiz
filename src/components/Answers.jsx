import React, { Component } from 'react';
import Recorder from '../scenes/Recorder';
import '../styles/scss/answers.scss';
import '../styles/css/answers.css';

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
            <div className="page">
                <div className='answer'>
                    <h1>איזור יצירת השאלות</h1>
                    <div className="recorder">
                        <Recorder addedClasses='AQ-recorder' />
                        <input
                            pattern="[A-Za-z]" //doen't work :/
                            type="text"
                            placeholder="אנא הכנס את התשובה לשאלה שהקלטת פה"
                            onChange={this.handleAnswer}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default AnswersAndRecords