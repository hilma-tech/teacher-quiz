import React, { Component } from 'react';
import './home.css';


class Home extends Component {
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

    render() {
        return (
            <div className="main">
                <h1>welcom to the quiz section</h1>
                <h3>here you can add your questions</h3>
                <div className="questions">
                    {/* first question */}
                    <input
                        type="text"
                        first="first"
                        value={this.state.firstQuest.value}
                        onChange={(event) => this.updateQuests(event)}
                        placeholder="type here your question"
                    >
                    </input>
                    {/* questions */}
                    {this.state.quests.map((quest, index) => {
                        return (
                            <input
                                type="text"
                                index={index}
                                onChange={(event) => this.updateQuests(event)}
                                value={quest.value}
                                placeholder="type here your question"
                            >
                            </input>
                        )
                    })}
                    <button onClick={this.addQuestion}>+</button>
                </div>
                <button onClick={this.sendData}>send</button>
            </div>
        )
    }
}



export default Home;