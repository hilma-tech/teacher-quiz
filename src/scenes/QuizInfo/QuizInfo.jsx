import React, { useState } from 'react';
import './QuizInfo.scss';
import { Navbar, QuestUnit, ListUnit } from '../PageTools';
import { Delete, Edit } from '@material-ui/icons';

export default function QuizInfo({ history }) {
    const [questMode, setQuestMode] = useState(true);
    const [quests, setQuests] = useState([
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['ירושלים', 'ירושלים'] },
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['תל אביב'] },
        { quest: '?מה היא עיר הבירה של ישראל', ans: ['חיפה'] }
    ])
    //navigate fn
    const navIconFn = () => history.go(-1);
    const moveToStudentInfo = () => history.push('student-info');

    const changeQuestMode = () => setQuestMode(!questMode);

    return (
        <div className="quiz-info">
            <Navbar
                mode={3}
                iconFn={navIconFn}
                rightIcons={<div>
                    <Edit />
                    <Delete />
                </div>} />

            <TopSection questMode={questMode} changeQuestMode={changeQuestMode} />

            {questMode ?
                quests.map(({ quest, ans }, i) =>
                    <QuestUnit
                        index={i}
                        key={i}
                        quest={{
                            qVal: quest
                        }} />
                ) :
                <ListUnit
                    onClick={moveToStudentInfo}
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
                src='/images/questions_tab.svg'
                className="bg"
                style={{ zIndex: questMode ? 0 : 1 }}
            />

            <img
                src='/images/student_tab.svg'
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
                        <img src='images/conversation-blue.svg' />
                    </div>
                </div>
            </div>

            <div className='toggle-icons'>
                <img
                    src={`../images/check-list${questMode ? '-colored' : ''}.svg`}
                    onClick={changeQuestMode} />

                <img
                    src={`../images/conversation${questMode ? '' : '-colored'}.svg`}
                    onClick={changeQuestMode} />
            </div>
        </div >
    );
}
