import React, { Component } from 'react';
import './questions.css';
import TextField from '@material-ui/core/TextField';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';



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
        window.alert("your questions has been sent successfully")
    }

    updateQuests = (event) => {
        console.log('event: ', event.target);
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
        console.log('event: ', event.target, 'current', event.currentTarget);
        let quests = this.state.quests
        let index = event.currentTarget.getAttribute("index");
        delete quests[index]
        this.setState({ quests });
    }


    render() {
        return (
            <div className="main">
                <h1>welcom to the quiz section</h1>
                <h3>here you can add your questions</h3>
                <div className="questions">
                    {/* material try*/}
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        first="first"   //doesn't show up
                        test="material" //doesn't show up
                        size="small"
                        value={this.state.firstQuest.value}
                        onChange={this.updateQuests}
                        placeholder="type here your question"
                        />
                    <div>
                        {/* first question */}
                        <input
                            type="text"
                            first="first"
                            value={this.state.firstQuest.value}
                            onChange={this.updateQuests}
                            placeholder="type here your question"
                        >
                        </input>
                        <Link to="/answers">
                        <GraphicEqIcon/>
                        </Link>
                        <DeleteIcon/>
                    </div>
                    {/* questions */}
                    {this.state.quests.map((quest, index) => {
                        return (
                            <div>
                            <input
                                type="text"
                                index={index}
                                onChange={this.updateQuests}
                                value={quest.value}
                                placeholder="type here your question"
                            >
                            </input>
                            <Link to="/answers">
                         <GraphicEqIcon/>
                         </Link>
                         <DeleteIcon index={index} onClick={this.deleteQuestion}/>
                            </div>
                        )
                    })}
                    <button onClick={this.addQuestion}>+</button>
                </div>
                <button onClick={this.sendData}>send</button>
            </div>
        )
    }
}



export default Questions;