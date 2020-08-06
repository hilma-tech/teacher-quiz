import React, { Component } from 'react';
import '../styles/scss/questions.scss';
// import './styles/css/questions.css';
import { TextField, IconButton, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add, Delete, GraphicEq, Telegram } from '@material-ui/icons';



class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            firstQuest: { value: '' }
        }
    }

    sendData = () => {
        //need to create db for that
        let { quests } = this.state
        let emptyFields = []
        let first = this.state.firstQuest


        quests.map((quest) => {
            if (!quest.value) emptyFields.push(quest)
        })

        if (first.value && !emptyFields.length) {
            window.alert("your questions has been sent successfully")
        }

        else {
            window.alert("all fields must to be filled")
        }

    }

    updateQuests = (event) => {

        let { value } = event.target
        let index = event.target.getAttribute("index")
        let attribute = event.target.getAttribute("first")
        if (attribute == "first") {
            var question = { value }
            this.setState({ firstQuest: question })
        }
        else {
            var currentQuests = this.state.quests
            currentQuests[index].value = value
            this.setState({ quests: currentQuests })
        }
    }

    addQuestion = () => {
        var currentQuests = this.state.quests
        currentQuests.push({ value: "" })
        this.setState({ quests: currentQuests })
    }

    deleteQuestion = (event) => {

        let { quests } = this.state
        let index = event.currentTarget.getAttribute("index");
        delete quests[index]
        this.setState({ quests });
    }


    render() {
        return (
            <div className="questions">
                <div className="main">
                    <h1 className="title">איזור השאלות</h1>
                    <h3 className="title">כאן אתה יכול להוסיף ולמחוק שאלות</h3>
                    <div className="question-list">
                        <QuestionUnit quest={{ value: this.state.firstQuest.value, index: -1 }} fn={{ ...this }} />

                        {/* questions */}
                        {this.state.quests.map((quest, index) =>
                            <QuestionUnit quest={{ ...quest, index }} fn={{ ...this }} />
                        )}
                    </div>

                    <IconButton className='add-btn'>
                        <Add onClick={this.addQuestion} />
                    </IconButton>

                    {/* <div className="post-btn" onClick={this.sendData}>
                        <span className="post-text">post challenge</span>
                        <span className="telegram-icon">
                            <TelegramIcon />
                        </span>
                    </div> */}


                    <Button className='publish-btn'>
                        פירסום אתגר
                        <Telegram onClick={this.sendData} />
                    </Button>
                </div>
            </div>
        )
    }
}

function QuestionUnit({
    quest: { value, index },
    fn: { updateQuests, deleteQuestion }
}) {
    return (
        <div className='quest-unit'>
            <input
                type="text"
                className="input"
                index={index}
                onChange={updateQuests}
                value={value}
                placeholder="type here your question"
            >
            </input>

            <div className='icons' >
                <Link to="/answers" className="link">
                    <GraphicEq />
                </Link>
                <Delete index={index} onClick={deleteQuestion} />
            </div>
        </div>
    );
}




export default Questions;