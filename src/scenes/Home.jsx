import React, { Component } from 'react';
import '../styles/scss/home.scss';
// import './styles/css/home.css';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import { ControlPoint, Add } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';

import { IconButton } from '@material-ui/core';





class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [{ name: 'מקומות מסביב לעולם', inEditMode: false },
            { name: 'שמות של מאכלים', inEditMode: false }]
        }
    }

    deleteChallenge = (event) => {
        // window.alert("are you sure that you want to delete this challenge?")
        let challenges = this.state.challenges
        let index = event.currentTarget.getAttribute("index");
        // var confirmation = false;
        // if (confirm("gghghghjgh")) {
        //   confirmation = true;
        // } else {
        //   confirmation = false;
        // }
        // if(confirmation){
        //     delete challenges[index]
        // }
        delete challenges[index]
        this.setState({ challenges });
    }

    addNewChallenge = () => {
        let challenges = this.state.challenges
        challenges.push({ inEditMode: true, name: '' })
        this.setState({ challenges })
    }

    edit = (event) => {
        let challenges = this.state.challenges
        let index = event.currentTarget.getAttribute("index")
        challenges[index].inEditMode = true;
        this.setState({ challenges })
    }

    editOnEnter = (event) => {
        let challenges = this.state.challenges
        let index = event.currentTarget.getAttribute("index")
        if (event.key === "Enter") {
            challenges[index].inEditMode = false;
            this.setState({ challenges })
        }
    }

    handleAnswer = (event) => {
        let challenges = this.state.challenges
        let value = event.target.value
        let index = event.target.getAttribute("index")
        challenges[index].name = value
        this.setState({ challenges })
    }

    render() {

        const { challenges } = this.state;

        return (
            <div className="home">
                <div className="main">
                    <div className='title' >
                        <h1>שלום מורה</h1>
                        <h3>האתגרים שיצרת</h3>
                    </div>

                    <div className="challenge-list">
                        {challenges.map((chall, index) =>
                            <ChallengeUnit challInfo={{ ...chall, index }} fn={{ ...this }} />
                        )}
                    </div>

                    <IconButton>
                        <Add
                            className="button"
                            onClick={this.addNewChallenge}
                        />
                    </IconButton>

                </div>
            </div>
        )
    }
}


function ChallengeUnit({
    challInfo: { inEditMode, name, index },
    fn: { handleAnswer, editOnEnter, deleteChallenge, edit }
}) {

    return (
        <div className="challenge">
            {
                inEditMode ?
                    <input
                        index={index}
                        className="input"
                        type="text"
                        placeholder="name here"
                        value={name}
                        onChange={handleAnswer}
                        onKeyPress={editOnEnter}>
                    </input>
                    :
                    <Link to='/questions' className="link">
                        {name}
                    </Link>

            }
            <div className='icons' >
                <DeleteIcon index={index} onClick={deleteChallenge} />
                {inEditMode ? '' : <EditIcon index={index} onClick={edit} />}
            </div>
        </div>
    )

}

export default Home;