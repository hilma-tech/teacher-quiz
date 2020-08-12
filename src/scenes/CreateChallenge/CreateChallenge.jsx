import React, { Component, useState, useEffect } from 'react';
import './CreateChallenge.scss';
import { Link } from 'react-router-dom';
import { ArrowBack, Delete, Clear } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { Choose } from '../CreateNewQuestionnaire/CreateNewQuestionnaire';
import { Navbar } from '../PageTools';
import CreateNewQuest from './CreateNewQuest';

function CreateChallenge({ history, TeacherStore }) {
    const [serialNum, setSerialNum] = useState(0)
    // const [questions, setQuestions] = useState([
    //     { question: { value: '' } },
    //     { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'ירושלים' }, { value: 'ירושלים' }] },
    //     { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'תל אביב' }] },
    //     { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }
    // ])

    useEffect(() => { createSerialNum(); }, [])

    const navIconFn = () => history.go(-1);

    const createSerialNum = () => {
        const num = Math.floor(100000 + Math.random() * 900000);
        setSerialNum(num);
    }

    const addAnswer = (event) => {
        let index = event.target.getAttribute("index");
        TeacherStore.QuestionnairesStore.challengeQuestions[index].answers.push({ value: '' })
        // setQuestions(questions)
    }

    const handleValue = ({ target }) => {
        const index = target.getAttribute("index");
        const tag = target.getAttribute('tag');
        const { id, value } = target

        if (tag === "quest") TeacherStore.QuestionnairesStore.challengeQuestions[index].question.value = value;
        else if (tag === "answer") TeacherStore.QuestionnairesStore.challengeQuestions[index].answers[id].value = value;
        // setQuestions(questions)
    }

    const deleteAnswer = ({ currentTarget }) => {
        let index = currentTarget.getAttribute("index");
        let { id } = currentTarget
        delete TeacherStore.QuestionnairesStore.challengeQuestions[index].answers[id];
        // setQuestions(questions);
    }

    const deleteQuestion = ({ currentTarget }) => {
        let index = currentTarget.getAttribute("index");
        delete TeacherStore.QuestionnairesStore.challengeQuestions[index]
        // setQuestions(questions)
    }

    const addQuestion = () => {
        TeacherStore.QuestionnairesStore.challengeQuestions.unshift({ question: '', answers: [{ value: '' }] })
        // setQuestions(questions)
    }

    const openSelectList = () => {

    }

    const displayQuestionsCards = () => {
        if (!TeacherStore.QuestionnairesStore.challengeQuestions.length) {
            return (<Choose addQuestSection={(e) => console.log(e)} />)
        }
        else {
            return (
                TeacherStore.QuestionnairesStore.challengeQuestions.map((quest, index) => {
                    if (!quest.question.value) return (<Choose key={`empty-quest-${index}`} addQuestSection={(e) => { console.log(e) }} />)
                    else {
                        return (
                            <div key={`quest-con-${index}`} className="question-unit" >
                                <div className="delete" index={index} onClick={deleteQuestion}>
                                    <Delete />
                                </div>
                                <p>שאלה</p>
                                <div className="question">
                                    <input tag="quest" index={index} onChange={handleValue} value={quest.question.value} />
                                </div>
                                <p>תשובה</p>
                                {quest.answers && displayAnswers(quest.answers, index)}
                                <div className="add-answer" onClick={addAnswer} index={index}>
                                    + הוסף תשובה
                            </div >
                            </div >
                        );
                    }
                })
            )
        }
    }

    const displayAnswers = (questAnswers, index) => {
        return questAnswers.map((answer, id) => (
            <div key={`answer-con-${id}`} className="answer">
                <input
                    key={`answer-input-${id}`}
                    tag="answer"
                    index={index}
                    id={id}
                    value={answer.value}
                    onChange={handleValue} />
                <div key={`answer-clear-icon-con-${id}`}
                    index={index}
                    id={id}
                    onClick={deleteAnswer}>
                    <Clear />
                </div>
            </div>
        ))
    }


    return (
        <div className="create-challenge">
            <Navbar mode={2} iconFn={navIconFn} />
            <TextField label="Questionnaire name" />

            <p className='cc__p'>Serial Number:<span>{serialNum}</span></p>
            {/* <CreateNewQuest /> */}
            {displayQuestionsCards()}
            <div className="add-quest-btn" onClick={addQuestion}>
                הוסף שאלה +
                </div>
        </div >
    )
}

export default inject('TeacherStore')(observer(CreateChallenge));
