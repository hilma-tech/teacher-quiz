import React, { Component } from 'react';
import '../styles/scss/student-quiz-info.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class StudentQuizInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [
                {question: '?מה היא עיר הבירה של ישראל', answer: 'ירושלים', status: 'wrong'},
                {question: '?מה היא עיר הבירה של ישראל', answer: 'תל אביב', status: 'right'},
                {question: '?מה היא עיר הבירה של ישראל', answer: '', status: 'no status'}

            ]
        }
    }

    render() {
        return (
            <div className="student-quiz-info">
                <div className="top-bar">
                    <CloseIcon />
                </div>
                <h1>ערי בירה</h1>
                <div className="tags">
                    <span>גאוגרפיה</span>
                    <span>כיתה יא</span>
                </div>
                <div className="summary">
                    <h1>אור כהן</h1>
                    <h1>6/10</h1>
                </div>
                {this.state.challenges.map((challenge)=>{
                    return (
                        <div className="challenge-unit">
                            {challenge.status === 'right'?
                            <div className="right"><CheckCircleOutlineIcon/></div>:
                            challenge.status === 'wrong'? 
                            <div className="wrong"><HighlightOffIcon/></div>: 
                            <div className="none"><RemoveCircleOutlineIcon/></div>}
                            <p>שאלה</p>
                            <div className="text-box">{challenge.question}</div> 
                            <p>תשובה</p>
                            <div className="text-box">{challenge.answer}</div>
                        </div>
                    )
                })}

            </div>
        )

    }
}

export default StudentQuizInfo;