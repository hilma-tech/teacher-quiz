import React, { Component } from 'react';
import '../styles/scss/questionnaire.scss';
import { inject, observer } from 'mobx-react';
import { ArrowBack, Clear } from '@material-ui/icons';
import Text from '../images/Group 459.svg';
import Mic from '../images/Group 582.svg';


class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNum: 1353468,
            questions: [
                { quest: '', answers: [{ ans: '' }, { ans: '' }, { ans: '' }] }
            ],
            records: [
                { record: '', answers: [{ ans: '' }] }
            ]
        }
    }


    componentDidMount() {
        (async () => {

            const lala = await this.props.QuestionnairesStore;
            console.log('store here', lala);
        })()

    }

    addQuestion = () => {

    }

    addAnswer = (index, e) => {
        let { questions } = this.state
        questions[index].answers.push({ ans: '' })
        this.setState({ questions });
    }

    addQuestSection = ({target:{type}}) => {
        let { questions } = this.state

        if (type === "record") {
            questions.push({ quest: '', answers: [{ ans: '' }] })
        }

        else {

        }
    }

    render() {
        const {serialNum } = this.state;
        
        return (
            <div className="questionnaire">
                <div className="top-bar">
                    <ArrowBack />
                </div>
                <h1>Questionnaire name</h1>
                <hr />
                <div className="serial-num">
                    <p>:Serial Number </p>
                    <p>{serialNum}</p>
                </div>
                <Choose {...this} />
                <QuestionCard {...this} />

            </div>
        )
    }
}

export default inject('QuestionnairesStore')(observer(Questionnaire));


export function Choose({
    addQuestSection
}) {
    return (
        <div className="choose">
            <p>Choose:</p>
            <div className="icons">
                <img
                    type="record"
                    src={Mic}
                    onClick={addQuestSection}
                />
                <img
                    type="text"
                    src={Text}
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

