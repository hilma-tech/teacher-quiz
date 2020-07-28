import React, { Component } from 'react';
import '../styles/scss/student-quiz-info.scss';
import { Link } from 'react-router-dom';
import { Close, HighlightOff, CheckCircleOutline, RemoveCircleOutline, PlayCircleOutline } from '@material-ui/icons';
import { Navbar} from '../components/PageTools';

class StudentQuizInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [
                { question: "?What is Israel's capital city", answer: 'Jerusalem', status: 'wrong' },
                { question: "?What is Israel's capital city", answer: 'Tel-Aviv', status: 'right' },
                { question: "?What is Israel's capital city", answer: '', status: 'no status' }

            ]
        }
    }

    render() {
        return (
            <div className="student-quiz-info">
                <Navbar mode={3}/>
                <h1> Capital City</h1>
                <div className="summary">
                    <h1>Or Cohen</h1>
                    <h1>6/10</h1>
                </div>
                {this.state.challenges.map((challenge) => {
                    return (
                        <div className="quest-unit">
                            {challenge.status === 'right' ?
                                <div className="right"><CheckCircleOutline /></div> :
                                challenge.status === 'wrong' ?
                                    <div className="wrong"><HighlightOff /></div> :
                                    <div className="none"><RemoveCircleOutline /></div>}
                            <p>Question</p>
                            <div className="text-box">
                                {challenge.question}
                                <div>
                                    <Link to="">
                                        <PlayCircleOutline />
                                    </Link>
                                </div>
                            </div>
                            <p>Answer</p>
                            <div className="text-box">
                                {challenge.answer}
                                <div>
                                    <Link to="">
                                        <PlayCircleOutline />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )

    }
}

export default StudentQuizInfo;