import React, { Component } from 'react';
import './styles/scss/home.scss';
// import './styles/css/home.css';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import EditIcon from '@material-ui/icons/Edit';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [{ name: 'places around the world', inEditMode: false },
            { name: 'food names', inEditMode: false }]
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
        return (
            <div className="home">
                <div className="main">
                    <h1 className="title">שלום מורה!</h1>
                    <h3 className="title">האתגרים שיצרת</h3>
                    <div>
                        {this.state.challenges.map((chall, index) => {
                            return (
                                <div className="challenge-list">
                                    {!chall.inEditMode &&
                                        <div className="challenges">
                                            <Link to='/questions' className="link">
                                                <div className="name">
                                                    {chall.name}
                                                </div>
                                            </Link>
                                            <DeleteIcon index={index} onClick={this.deleteChallenge} />
                                            <EditIcon index={index} onClick={this.edit} />
                                        </div>}
                                    {chall.inEditMode &&
                                        <div className="challenges">
                                            <input
                                                index={index}
                                                className="input"
                                                type="text"
                                                placeholder="name here"
                                                value={chall.name}
                                                onChange={this.handleAnswer}
                                                onKeyPress={this.editOnEnter}
                                            ></input>
                                            <DeleteIcon index={index} onClick={this.deleteChallenge} />
                                        </div>}
                                </div>
                            )
                        })}
                        <ControlPointIcon
                            className="button"
                            onClick={this.addNewChallenge}
                            fontSize="large"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;