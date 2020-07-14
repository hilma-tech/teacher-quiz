import React, { Component } from 'react';
import '../styles/scss/summary-quiz.scss';
import { Link } from 'react-router-dom';
import { MoreHoriz, Clear, Delete, Edit, Menu, Search, Star } from '@material-ui/icons';
import CheckList from '../images/check-list.svg';
import CheckListColored from '../images/check-list-colored.svg';
import ConversationBlue from '../images/conversation-blue.svg';
import ConversationColored from '../images/conversation-colored.svg';
import Conversation from '../images/conversation.svg';
import StudentsTab from '../images/Path 419.svg';
import QuestionsTab from '../images/Path 420.svg';
import DefaultImage from '../images/default-profile.png';



class SummaryQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questMode: true
        }
    }

    changeMode = () =>{
        let questMode = this.state.questMode
        questMode = !questMode
        console.log('mode changed!', questMode);
        this.setState({questMode})
    }

    render() {
        let mode = this.state.questMode;
        return (
            <div className="summary-quiz">
                <div className="top-section">
                    <div className="top-bar">
                        <Clear />
                        {
                            mode &&
                            <div className="left-side">
                                <Delete />
                                <Edit />
                            </div>
                        }
                    </div>
                    <div className="questions-tab" style={{zIndex: mode?'2': '-2'}}>
                        <img
                            src={QuestionsTab}
                            className="background"
                        />
                        <div className="icons" style={{zIndex: mode?'1': '-1'}}>
                            <img
                                src={CheckListColored}
                                className="first-icon"
                            />
                            <img
                                src={Conversation}
                                className="second-icon"
                                onClick={this.changeMode}
                            />
                        </div>
                    </div>
                    <div className="students-tab" style={{zIndex: mode?'-2': '2'}}>
                        <img
                            src={StudentsTab}
                            className="background"
                        />
                        <div className="icons" style={{zIndex: mode?'-1': '1'}}>
                            <img
                                src={CheckList}
                                className="first-icon"
                                onClick={this.changeMode}

                            />
                            <img
                                src={ConversationColored}
                                className="second-icon"
                            />
                        </div>
                    </div>
                    <div className="details">
                        <div className="right">
                            <h1>ערי בירה</h1>
                            <p>גאוגרפיה</p>
                        </div>
                        <div className="left">
                            <p>כיתה יא</p>
                            <div className="ans-num">
                                <img src={ConversationBlue} />
                                <p>25</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comp">
                {this.state.questMode? <Challenge/>: <StudentList/>}
                </div>
            </div>
        )

    }
}


export class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'ירושלים' }, { value: 'ירושלים' }] },
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'תל אביב' }] },
                { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }
            ]
        }
    }

     render() {
        return (
            <div className="create-challenge">   
                {this.state.questions.map((quest, index) => {
                    return (
                        <div className="question-unit">
                            <div
                                className="delete"
                                index={index}
                                onClick={this.deleteQuestion}
                            >
                                <MoreHoriz />
                            </div>
                            <p>שאלה</p>
                            <div
                                className="question special-color">
                                <input
                                    tag="quest"
                                    index={index}
                                    onChange={this.handleValue}
                                    value={quest.question.value}
                                >
                                </input>
                            </div>
                            <p>תשובה</p>
                            {quest.answers &&
                                quest.answers.map((answer, id) => (
                                    <div className="answer special-color">
                                        <input
                                            tag="answer"
                                            index={index}
                                            id={id}
                                            value={answer.value}
                                            onChange={this.handleValue}
                                        >
                                        </input>
                                    </div>
                                ))}
                        </div>
                    )
                })}
            </div>
        )

    }
}


// const studentCard = ({ student }) => {
//     return (
//         <div className="student-card">
//             <img
//                 className="profile-img"
//                 src={student.image ? student.image : DefaultImage}>
//             </img>
//             <div>{student.name}</div>
//             <div>
//                 <Star />
//                 {student.score}
//             </div>
//         </div>
//     )
// }

export class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                { name: 'אור כהן', score: '8/10', image: '' },
                { name: 'שלמה לוי', score: '8/10', image: '' },
                { name: 'תום טרגר', score: '8/10', image: '' },
                { name: "פיטר קפלדי", score: '8/10', image: '' },
                { name: "מאט סמית'", score: '8/10', image: '' },
                { name: 'אמיר אלון', score: '8/10', image: '' },
                { name: 'נוי כספי', score: '8/10', image: '' }
            ]
        }
    }

    render() {
        return (
            <div className="student-list">
                {this.state.students.map((student) => {
                    return (
                        <div className="student-card">
                            <div className="name">{student.name}</div>
                            <div className="score">
                                {student.score}
                            </div>
                        </div>
                    )
                })}
            </div>
        )

    }
}

export default SummaryQuiz;