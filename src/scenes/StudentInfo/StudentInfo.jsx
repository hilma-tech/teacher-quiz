import React, { useState } from 'react';
import './StudentInfo.scss';
import { Star } from '@material-ui/icons';
import { ListUnit, Navbar } from '../PageTools';

export default function StudentInfo({ history }) {
    const [sInfo, setSInfo] = useState({
        name: 'Or Cohen',
        score: 80,
        challenges: [
            { category: 'Capital City', score: 80, unitName: '123456' },
            { category: 'Capital City', score: 80, unitName: '123456' },
            { category: 'Capital City', score: 80, unitName: '123456' },
            { category: 'Capital City', score: 80, unitName: '123456' },
            { category: 'Capital City', score: 80, unitName: '123456' },
            { category: 'Capital City', score: 80, unitName: '123456' },
        ]
    });

    const moveToStudentQuizInfo = () => {
        history.push('student-quiz-info');
    }

    const { name, score, challenges } = sInfo;
    return (
        <div className="student-info">
            <Navbar mode={2} />

            <div className='personal-info'>
                <h1>{name}</h1>
                <div>
                    <p>{score}</p>
                    <Star />
                </div>
            </div>

            <div className='chall-container'>
                {challenges &&
                    challenges.map(({ category, score, unitName }, i) =>
                        <ListUnit
                            index={i}
                            mode={2}
                            onClick={moveToStudentQuizInfo}
                            info={{
                                title: category,
                                subTitle: unitName,
                                numInfo: score
                            }} />
                    )}
            </div>
        </div>
    )
}

