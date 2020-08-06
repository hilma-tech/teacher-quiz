import React, { useState } from 'react';
import './ListStockQuizs.scss';
import { Navbar, ListUnit, PlusBtn } from '../PageTools';


export default function ListStockQuizs({ history }) {
    const [quizzes, setQuizzes] = useState([
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
        {
            category: 'Capital City', unitName: '123456',
            ansNum: 25
        },
    ])

    const moveToQuestionnaire = () => {
        history.push('quiz-info');
    }

    return (
        <div className="list-stock-quiz">
            <Navbar mode={1} />

            <h1>Questionnaires</h1>

            <div className='quizzes-container'>
                {quizzes.map(({ category, ansNum, unitName }, index) =>
                    <ListUnit
                        key={index}
                        mode={1}
                        onClick={moveToQuestionnaire}
                        info={{
                            title: category,
                            subTitle: unitName,
                            numInfo: ansNum
                        }} />
                )}
            </div>

            <PlusBtn redirect="create-challenge" />
        </div>
    )
}



