import React, { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            firstQuest: { value: '' }
        }
    }

    updateQuests = (event, index) => {
        console.log('update event: ', event.target);
        if (event.target.first) {
            console.log('inside first');
            var value = { value: event.target.value }
            this.setState({ firstQuest: value })
        }
        else {
            console.log('inside else');
            var currentQuests = this.state.quests
            currentQuests[index].value = event.target.value
            this.setState({ quests: currentQuests })
        }

    }

    addQuestion = (event) => {
        console.log('add event: ', event);

        var currentQuests = this.state.quests
        currentQuests.push({ value: "" })
        this.setState({ quests: currentQuests })
    }

    render() {
        return (
            <div>
                <h1>welcom to the quiz section</h1>
                <h3>here you can add your questions</h3>
                <div>
                    {/* first question */}
                    <input
                        type="text"
                        first
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
                                onChange={(event, index) => this.updateQuests(event, index)}
                                value={quest.value}
                                placeholder="type here your question"
                            >
                            </input>
                        )
                    })}
                    <button onClick={(event) => this.addQuestion(event)}>+</button>
                </div>
            </div>
        )
    }
}



export default Home;