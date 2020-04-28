import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [{ name: 'places around the world' },
            { name: 'food names' }]
        }
    }

    deleteChallenge = (event) => {
        console.log('event: ', event.target, 'current', event.currentTarget);
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


    render() {
        return (
            <div>
                <h1>שלום מורה!</h1>
                <h3>האתגרים שיצרת</h3>
                <div>
                    {this.state.challenges.map((chall, index) => {
                        return (
                            <div>
                                <Link to='/questions'>
                                    <div className="challenges">
                                        {chall.name}
                                    </div>
                                </Link>
                                {/* <button index={index} onClick={(event) => this.deleteChallenge(event)}> */}
                                    <DeleteIcon index={index} onClick={this.deleteChallenge}/>
                                {/* </button> */}
                            </div>

                        )
                    })}
                </div>
                {/* <div>
                    <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
                    <Input
                        disabled="disabled"
                        value='nnnnn'
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DeleteIcon onClick={this.deleteChallenge}/>
                            </InputAdornment>
                        }
                    />
                </div> */}
            </div>
        )
    }
}

export default Home;