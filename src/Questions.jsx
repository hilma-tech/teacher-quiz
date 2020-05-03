import React, { Component } from 'react';
import './styles/scss/questions.scss';
// import './styles/css/questions.css';
import TextField from '@material-ui/core/TextField';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import TelegramIcon from '@material-ui/icons/Telegram';



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
        let quests = this.state.quests
        let emptyFields = []
        let first = this.state.firstQuest
        

        quests.map((quest)=>{
            if(!quest.value){
                emptyFields.push(quest)
            }
        })
        
        if(first.value && !emptyFields.length){
            window.alert("your questions has been sent successfully")
        }

        else{    
            window.alert("all fields must to be filled")
        }
       
    }

    updateQuests = (event) => {
        
        let value = event.target.value
        let index = event.target.getAttribute("index")
        let attribute = event.target.getAttribute("first")
        if (attribute == "first") {
            var question = { value: value }
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
        
        let quests = this.state.quests
        let index = event.currentTarget.getAttribute("index");
        delete quests[index]
        this.setState({ quests });
    }


    render() {
        return (
            <div className="questions">
                <div className="main">
                    <h1 className="title">welcom to the quiz section</h1>
                    <h3 className="title">here you can add your questions</h3>
                    <div className="question-list">
                        {/* material try*/}
                        {/* <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        first="first"   //doesn't show up
                        test="material" //doesn't show up
                        size="small"
                        value={this.state.firstQuest.value}
                        onChange={this.updateQuests}
                        placeholder="type here your question"
                        /> */}
                        <div>
                            {/* first question */}
                            <input
                                className="input"
                                type="text"
                                first="first"
                                value={this.state.firstQuest.value}
                                onChange={this.updateQuests}
                                placeholder="type here your question"
                            >
                            </input>
                            <Link to="/answers">
                                <GraphicEqIcon />
                            </Link>
                            <DeleteIcon />
                        </div>
                        {/* questions */}
                        {this.state.quests.map((quest, index) => {
                            return (
                                <div>
                                    <input
                                        type="text"
                                        className="input"
                                        index={index}
                                        onChange={this.updateQuests}
                                        value={quest.value}
                                        placeholder="type here your question"
                                    >
                                    </input>
                                    <Link to="/answers" className="link">
                                        <GraphicEqIcon />
                                    </Link>
                                    <DeleteIcon index={index} onClick={this.deleteQuestion} />
                                </div>
                            )
                        })}
                    </div>
                        <ControlPointIcon className="add-btn" onClick={this.addQuestion}/>
                        <div className="post-btn" onClick={this.sendData}>
                        <span className="post-text">post challenge</span>
                        <span className="telegram-icon">
                        <TelegramIcon />
                        </span>
                        </div>
                    {/* <button onClick={this.sendData}>send</button> */}
                </div>
            </div>
        )
    }
}



export default Questions;