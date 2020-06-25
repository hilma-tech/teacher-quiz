import React, { Component } from 'react';
import '../styles/scss/stock-quiz.scss';
import { Link } from 'react-router-dom';
import {Menu, Add} from '@material-ui/icons';
import Conversation from '../images/conversation-blue.svg';

// const quizCard = ({quiz}) => {

//     return (
//         <div className="quiz-card">
//             <div>
//             <div>{quiz.category}</div>
//             <div>{quiz.unitName}</div>
//             </div>
//             <div>
//             <div>{quiz.grade}</div>
//             <div>{quiz.ansNum}</div>
//             </div>
//         </div>
//     )
// }

class StockQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
            ]
        }
    }

    openSelectList = () => {

    }

    render() {
        return (
            <div className="stock-quiz">
                <div className="top-bar">
                    <Menu />
                </div>
                <h1>Questionnaires</h1>
                {this.state.quizzes.map((quiz) => {
                    return (
                        <div className="quiz-card">
                            <div>
                                <div className="ans-num">
                                    <img src={Conversation}></img>
                                    <div>{quiz.ansNum}</div>
                                </div>
                            </div>
                            <div>
                                <div className="category">{quiz.category}</div>
                                <div className="unit-name">{quiz.unitName}</div>
                            </div>
                        </div>
                    )
                })}
                <div className="plus-btn">
                    <div className="plus-sign">
                        <Link to="create-challenge">
                        <Add />
                        </Link>
                    </div>
                </div>
            </div>
        )

    }
}

export default StockQuiz;
