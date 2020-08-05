import React, { useState } from 'react';
import '../styles/scss/CreateNewQuestionnaire.scss';
import { Navbar } from '../components/PageTools';

export default function CreateNewQuestionnaire() {
    const [serialNum, setSerialNum] = useState(1353468);
    const [quests, setQuests] = useState([
        { quest: '', answers: [{ ans: '' }, { ans: '' }, { ans: '' }] }
    ]);
    const [records, setRecords] = useState([
        { record: '', answers: [{ ans: '' }] }
    ]);

    const addAnswer = (index, e) => {
        let { questions } = this.state
        questions[index].answers.push({ ans: '' })
        this.setState({ questions });
    }

    const addQuestSection = ({ target: { type } }) => {
        let { questions } = this.state

        if (type === "record") {
            questions.push({ quest: '', answers: [{ ans: '' }] })
        }

        else {

        }
    }

    return (
        <div className="questionnaire">
            <Navbar mode={2} />
            <div className='container'>
                <h1>Questionnaire name</h1>
                <div className="serial-num">
                    <p>Serial Number:</p>
                    <p>{serialNum}</p>
                </div>
                <Choose {...this} />
                <QuestionCard {...this} />

            </div>

        </div>
    )
}




export function Choose({ addQuestSection }) {
    return (
        <div className="choose">
            <p>Choose:</p>
            <div className="icons">
                <img
                    type="record"
                    src='images/qMicIcon.svg'
                    onClick={addQuestSection}
                />
                <img
                    type="text"
                    src='images/qTextIcon.svg'
                    onClick={addQuestSection}
                />
            </div>
        </div>
    )
}

export function QuestionCard({
    addAnswer
}) {
    return (
        <div className="question-card">

        </div>
    )
}