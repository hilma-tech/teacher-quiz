import React, { Component } from 'react';
import '../styles/scss/question.scss';
import { ArrowBack, Clear } from '@material-ui/icons';
import { Chip } from '@material-ui/core';
// import DropDownArrow from '../images/chevron.svg';



class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chips: [
                { value: 'name' },
                { value: 'cloud' },
                { value: 'chest' },
                { value: 'eyeball' },
                { value: 'quanta' },
                { value: 'organism' },
                { value: 'sea' },
                { value: 'sun' },
                { value: 'apple' },
            ]
        }
    }


    handleDelete = (index, e) => {
        console.log("deleted", index);
        let { chips } = this.state
        delete chips[index]
        this.setState({ chips })
    }

    handleClick = (e) => {
        console.log("clicked");
    }

    addWord = () =>{
        console.log("added");
    }

    save = () =>{
        console.log("saved");
    }


    render() {
        const { chips } = this.state

        return (
            <div className="question-page">
                <div className="top-bar">
                    <ArrowBack />
                </div>
                <h1>New Question</h1>
                <hr />
                <p>word</p>
                <div className="chips">
                    {chips.map((chip, index) => {
                        return (
                            <div className="chip">
                                <Chip
                                    label={chip.value}
                                    onClick={this.handleClick}
                                    onDelete={() => this.handleDelete(index)}
                                    deleteIcon={<Clear />}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="add"
                     onClick={this.addWord}
                >
                    + Add word
                </div>
                <div className="save"
                     onClick={this.save}
                >
                    Save
                </div>
            </div>
        )
    }
}

export default Question;