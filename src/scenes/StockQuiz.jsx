import React, { Component } from 'react';
import '../styles/scss/stock-quiz.scss';
import { Link } from 'react-router-dom';
import {Menu, Search, Add} from '@material-ui/icons';
import Conversation from '../images/conversation-blue.svg';
import DropDownArrow from '../images/chevron.svg';

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
                    category: 'ערי בירה', unitName: 'שם היחידה',
                    grade: 'כיתה ט', ansNum: 25
                },
                {
                    category: 'ערי בירה', unitName: 'שם היחידה',
                    grade: 'כיתה ט', ansNum: 25
                },
                {
                    category: 'ערי בירה', unitName: 'שם היחידה',
                    grade: 'כיתה ט', ansNum: 25
                },
                {
                    category: 'ערי בירה', unitName: 'שם היחידה',
                    grade: 'כיתה ט', ansNum: 25
                },
                {
                    category: 'ערי בירה', unitName: 'שם היחידה',
                    grade: 'כיתה ט', ansNum: 25
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
                    <Search />
                </div>
                <h1>מאגר שאלונים</h1>
                <div className="filter-bar">
                    <div>
                        <select>
                            <option>כל היחידות</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            onClick={this.openSelectList}
                        />
                    </div>
                    <div>
                        <select>
                            <option>כל הרמות</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            onClick={this.openSelectList}
                        />
                    </div>
                    {/* filter bar */}
                </div>
                {/* {this.state.quizzes.map((quiz)=>{
                    return <quizCard quiz={quiz}/>
                })} */}
                {this.state.quizzes.map((quiz) => {
                    return (
                        <div className="quiz-card">
                            <div>
                                <div className="category">{quiz.category}</div>
                                <div className="unit-name">{quiz.unitName}</div>
                            </div>
                            <div>
                                <div className="grade">{quiz.grade}</div>
                                <div className="ans-num">
                                    <img src={Conversation}></img>
                                    <div>{quiz.ansNum}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="plus-btn">
                    <div className="plus-sign">
                        <Add />
                    </div>
                </div>
            </div>
        )

    }
}

export default StockQuiz;
