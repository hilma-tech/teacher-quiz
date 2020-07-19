import React, { useState } from 'react';
import '../styles/scss/ListStockQuizs.scss';
import { Navbar, ListUnit, PlusBtn } from '../components/PageTools';


export default function ListStockQuizs(props) {
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

    return (
        <div className="list-stock-quiz">
            <Navbar mode={1} />

            <h1>Questionnaires</h1>

            <div className='quizzes-container'>
            {quizzes.map(({ category, ansNum, unitName }) =>
                <ListUnit
                    mode={1}
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



