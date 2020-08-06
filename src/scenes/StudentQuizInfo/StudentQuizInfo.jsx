import React, { useState } from 'react';
import './StudentQuizInfo.scss';
import { Link } from 'react-router-dom';
import { Close, HighlightOff, CheckCircleOutline, RemoveCircleOutline, PlayCircleOutline } from '@material-ui/icons';
import { Navbar, QuestUnit } from '../PageTools';

export default function StudentQuizInfo(props) {
    const [challInfo, setChallInfo] = useState({
        challName: 'Capital City',
        studentName: 'Or Cohen',
        quests: [
            { quest: "?What is Israel's capital city", answer: 'Jerusalem', status: 0 },
            { quest: "?What is Israel's capital city", answer: 'Tel-Aviv', status: 1 },
            { quest: "?What is Israel's capital city", answer: undefined, status: undefined }

        ]
    })


    const correctAnswersFromAll = () => {
        const corrSum = quests.filter(x => x.status === 1).length;
        return `${corrSum}/${quests.length}`;
    }

    const { challName, studentName, quests } = challInfo;

    return (
        <div className="student-quiz-info">
            <Navbar mode={3} />

            <div className='info'>
                <h1>{challName}</h1>
                <div>
                    <h2>{studentName}</h2>
                    <h2>{correctAnswersFromAll()}</h2>
                </div>
            </div>

            {quests.map(({ quest, answer, status }) =>
                <QuestUnit
                    quest={{
                        qVal: quest,
                        // setQuests
                    }} />
            )}

        </div>
    )
}

