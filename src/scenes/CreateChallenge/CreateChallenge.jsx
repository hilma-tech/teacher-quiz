import React, { Component, useState, useEffect } from 'react';
import './CreateChallenge.scss';
import { Link } from 'react-router-dom';
import { ArrowBack, Delete, Clear } from '@material-ui/icons';
import { TextField } from '@material-ui/core';

import { Choose } from '../CreateNewQuestionnaire/CreateNewQuestionnaire';
import { Navbar } from '../PageTools';
import CreateNewQuest from './CreateNewQuest';

export default function CreateChallenge({ history }) {
    const [serialNum, setSerialNum] = useState(0)
    const [questions, setQuestions] = useState([
        { question: { value: '' } },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'ירושלים' }, { value: 'ירושלים' }] },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'תל אביב' }] },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }
    ])

    useEffect(() => {
        createSerialNum();
    }, [])

    const navIconFn = () => history.go(-1);

    const createSerialNum = () => {
        const num = Math.floor(100000 + Math.random() * 900000);
        setSerialNum(num);
    }

    const addAnswer = ({ target }) => {
        let index = target.getAttribute("index");
        questions[index].answers.push({ value: '' })
        setQuestions(questions)
    }

    const handleValue = ({ target: { id, value } }) => {
        const index = target.getAttribute("index");
        const tag = target.getAttribute('tag');

        if (tag === "quest") questions[index].question.value = value
        else if (tag === "answer") {
            questions[index].answers[id].value = value;
            setQuestions(questions);
        }

        const deleteAnswer = ({ currentTarget: { id } }) => {
            let index = target.getAttribute("index");
            delete questions[index].answers[id];
            setQuestions(questions);
        }

        const deleteQuestion = ({ currentTarget }) => {
            let index = currentTarget.getAttribute("index");
            delete questions[index]
            setQuestions(questions)
        }

        const addQuestion = () => {
            questions.unshift({ question: '', answers: [{ value: '' }] })
            setQuestions(questions)
        }

        const openSelectList = () => {

        }

        const displayQuestionsCards = () => {
            return (
                questions.map((quest, index) => {
                    if (!quest.question.value) return (<Choose addQuestSection={(e) => { console.log(e) }} />)
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

        const displayAnswers = (questAnswers, index) => {
            return (
                questAnswers.map((answer, id) => (
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
            )
        }


        return (
            <div className="create-challenge">
                <Navbar mode={2} iconFn={navIconFn} />
                <TextField label="Questionnaire name" />

                <p className='cc__p'>Serial Number:<span>{serialNum}</span></p>
                <CreateNewQuest />

            </div>
        )
    }

