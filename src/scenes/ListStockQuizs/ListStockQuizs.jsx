import React, { useState } from 'react';
import './ListStockQuizs.scss';
import { Navbar, ListUnit, PlusBtn } from '../PageTools';
import { inject, observer } from 'mobx-react';


function ListStockQuizs({ history, QuestionnairesStore }) {
    // const [quizzes, setQuizzes] = useState([
    // ])

    const moveToQuestionnaire = (id) => {
        //TODO get questions of the quize by the sended id
        QuestionnairesStore.currentQuizeId = id;
        QuestionnairesStore.getQuestionsByChallengeId(id)
        history.push('quiz-info');
    }

    return (
        <div className="list-stock-quiz page">
            <Navbar mode={1} />

            <h1>Questionnaires</h1>

            <div className='quizzes-container'>
                {QuestionnairesStore.quizes && QuestionnairesStore.quizes.map(({ id, category, ansNum, unitName }, index) =>
                    <ListUnit
                        index={index}
                        key={index}
                        mode={1}
                        onClick={(id) => moveToQuestionnaire(id)}
                        info={{
                            id,
                            title: category,
                            subTitle: unitName,
                            numInfo: ansNum
                        }}
                    />
                )}
            </div>
            <PlusBtn redirect="create-challenge" />
        </div>
    )
}



export default inject('QuestionnairesStore')(observer(ListStockQuizs));
