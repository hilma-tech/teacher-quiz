import React, { Component } from 'react';
import '../styles/scss/create-challenge.scss';
import { Link } from 'react-router-dom';
import { ArrowBack, Delete, Clear } from '@material-ui/icons';
import { Choose } from './CreateNewQuestionnaire'
import { Navbar } from '../components/PageTools'

export default class CreateChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNum: '1323456',
            questions: [
                { question: { value: '' } },
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'ירושלים' }, { value: 'ירושלים' }] },
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'תל אביב' }] },
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }
            ]
        }
    }

    addAnswer = (event) => {
        let index = event.target.getAttribute("index");
        let { questions } = this.state;
        questions[index].answers.push({ value: '' })
        this.setState({ questions })
    }

    handleValue = (event) => {
        console.log('event: ', event.target);
        let { questions } = this.state.questions
        let index = event.target.getAttribute("index");
        let { id, value } = event.target;

        const tag = event.target.getAttribute('tag');

        if (tag === "quest") {
            console.log('inside first if');
            console.log('index: ', index);

            questions[index].question.value = value
        }
        else if (tag === "answer") {
            console.log('inside second if');
            questions[index].answers[id].value = value;
        }
        this.setState({ questions })
    }

    deleteAnswer = (event) => {
        console.log('event: ', event.currentTarget);
        let { questions } = this.state
        let index = event.currentTarget.getAttribute("index");
        let { id } = event.currentTarget
        delete questions[index].answers[id];
        this.setState({ questions });

    }

    deleteQuestion = (event) => {
        console.log('event: ', event.currentTarget);
        let { questions } = this.state
        let index = event.currentTarget.getAttribute("index");
        delete questions[index]
        this.setState({ questions })
    }

    addQuestion = () => {
        let { questions } = this.state;
        questions.unshift({ question: '', answers: [{ value: '' }] })
        this.setState({ questions })
    }

    openSelectList = () => {

    }

    displayQuestionsCards = () => {
        let { questions } = this.state
        return (
            questions.map((quest, index) => {
                if (!quest.question.value) return (<Choose addQuestSection={(e) => { console.log(e) }} />)
                else {
                    return (
                        <div key={`quest-con-${index}`} className="question-unit" >
                            <div className="delete" index={index} onClick={this.deleteQuestion}>
                                <Delete />
                            </div>
                            <p>שאלה</p>
                            <div className="question">
                                <input tag="quest" index={index} onChange={this.handleValue} value={quest.question.value} />
                            </div>
                            <p>תשובה</p>
                            {quest.answers && this.displayAnswers(quest.answers, index)}
                            <div className="add-answer" onClick={this.addAnswer} index={index}>
                                + הוסף תשובה
                            </div >
                        </div >
                    );
                }
            })
        )
    }

    displayAnswers = (questAnswers, index) => {
        return (
            questAnswers.map((answer, id) => (
                <div key={`answer-con-${id}`} className="answer">
                    <input
                        key={`answer-input-${id}`}
                        tag="answer"
                        index={index}
                        id={id}
                        value={answer.value}
                        onChange={this.handleValue} />
                    <div key={`answer-clear-icon-con-${id}`}
                        index={index}
                        id={id}
                        onClick={this.deleteAnswer}>
                        <Clear />
                    </div>
                </div>
            ))
        )
    }

    navIconFn = () => {
        console.log("12313213")
        this.props.history.goBack()
    }

    render() {
        let { serialNum, questions } = this.state
        return (
            <div className="create-challenge">
                {/* <div className="top-bar">
                    <ArrowBack />
                </div> */}
                <Navbar mode={2} iconFn={this.navIconFn} />
                <h1>Questionnaire name</h1>
                <hr />
                <p>Serial Number: {serialNum}</p>
                {this.displayQuestionsCards()}
                <div
                    className="add-quest-btn"
                    onClick={this.addQuestion}
                >
                    הוסף שאלה +
                </div>
            </div>
        )

    }
}



// const questionCard = ()=>{
//     return(
//         <div className="quest-card">
//             <DeleteIcon />
//             <p>שאלה</p>
//             <input onChange={}></input>
//             <p>תשובה</p>
//             <input onChange={}></input>
//             <div onClick={}>הוסף תשובה +</div>
//         </div>
//     )
// }
