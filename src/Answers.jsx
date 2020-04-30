import React, { Component } from 'react';
import AlexaRecorder from './Recorder';
import './styles/scss/answers.scss';
import './styles/css/answers.css';

class AnswersAndRecords extends Component{
    constructor(props){
        super(props);
        this.state={
            answer: {value:''}
        }
    }

    handleAnswer = (event) =>{
        let answer = this.state.answer
        answer.value = event.target.value
        this.setState({answer})
    }

    render(){
        return(
            <div className="main-answers">
                <AlexaRecorder/>
                <input 
                pattern="[A-Za-z]" //doen't work :/
                type="text"
                placeholder="type here your answer"
                onChange={this.handleAnswer}
                >
                </input>
            </div>
        )
    }
}


export default AnswersAndRecords