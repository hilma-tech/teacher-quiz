import React, { useState, Component } from 'react';
import '../styles/scss/QuizInfo.scss';
import { MoreHoriz, Clear, Delete, Edit, Menu, Search, Star } from '@material-ui/icons';
import checkList from '../images/check-list.svg';
import cCheckList from '../images/check-list-colored.svg';
import ConversationBlue from '../images/conversation-blue.svg';
import cConversation from '../images/conversation-colored.svg';
import conversation from '../images/conversation.svg';
import StudentsTab from '../images/questions_tab.svg';
import QuestionsTab from '../images/student_tab.svg';
import DefaultImage from '../images/default-profile.png';

import { Navbar, QuestUnit, ListUnit } from '../components/PageTools';

export default function QuizInfo(props) {
    const [questMode, setQuestMode] = useState(true);
    const [quests, setQuests] = useState([
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['ירושלים', 'ירושלים'] },
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['תל אביב'] },
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['חיפה'] }
    ])

    const changeQuestMode = () => setQuestMode(!questMode);


    return (
        <div className="summary-quiz">
            <Navbar mode={4} />
            <TopSection questMode={questMode} changeQuestMode={changeQuestMode} />
            {questMode ?
                quests.map(({ quest, ans }) =>
                    <QuestUnit
                        quest={{
                            qVal: quest
                        }} />
                ) :
                <ListUnit
                    info={{
                        title: 'Or Choen',
                        numInfo: '8/10'
                    }}
                />
            }
        </div >
    )

}


function TopSection({ changeQuestMode, questMode }) {

    return (
        <div className='top-section'>
            <img
                src={QuestionsTab}
                className="bg"
                style={{ zIndex: questMode ? 0 : 1 }}
            />

            <img
                src={StudentsTab}
                className="bg"
                style={{ zIndex: questMode ? 1 : 0 }}
            />

            <div className="details">
                <div className="right">
                    <h1>Capital city</h1>
                    <p>123456</p>
                </div>
                <div className="left">
                    <p>grade 12</p>
                    <div>
                        <p>25</p>
                        <img src={ConversationBlue} />
                    </div>
                </div>
            </div>

            <div className='toggle-icons'>
                <img src={questMode ? cCheckList : checkList} onClick={changeQuestMode} />
                <img src={questMode ? conversation : cConversation} onClick={changeQuestMode} />
            </div>
        </div>
    );
}

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
                            <img
                                className="profile-img"
                                src={student.image || DefaultImage}>
                            </img>
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

