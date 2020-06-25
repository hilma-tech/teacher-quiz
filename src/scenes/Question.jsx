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


    handleDelete = (e) => {
        console.log("deleted");
    }

    handleClick = (e) => {
        console.log("clicked");
    }


    render() {
        let { chips } = this.state

        return (
            <div className="question-page">
                <div className="top-bar">
                    <ArrowBack />
                </div>
                <h1>New Question</h1>
                <hr />
                <div>
                    <select>
                        <option>כל הרמות</option>
                    </select>
                    {/* <img
                        src={DropDownArrow}
                        onClick={this.openSelectList}
                    /> */}
                </div>
                <p>word</p>
                <div className="chips">
                    {chips.map((chip, index) => {
                        return (
                            <div className="chip">
                                <Chip
                                    index={index}
                                    label={chip.value}
                                    onClick={this.handleClick}
                                    onDelete={this.handleDelete}
                                    deleteIcon={<Clear />}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="add">
                    + Add word
                </div>
                <div className="save">
                    Save
                </div>
            </div>
        )
    }
}

export default Question;