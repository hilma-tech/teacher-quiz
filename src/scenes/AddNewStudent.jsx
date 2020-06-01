import React, { Component } from 'react';
import '../styles/scss/add-new-student.scss';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, Share, Clear } from '@material-ui/icons';
import Social from '../images/social.svg';
import Upload from '../images/upload.svg';


class AddNewStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                firstName: '',
                lastName: '',
                phone: '',
                code: ''
            }
        }
    }

    handleValue = (event) =>{
        let {details} = this.state
        let {value} = event.target
        let name = event.target.getAttribute("name");
        details[name] = value;
        this.setState({details});

    }

    render() {
        let details = this.state.details
        
        return (
            <div className="add-new-student">
                <div className="top-bar">
                    <Clear />
                    <p>תלמיד חדש</p>
                </div>
                <img src={Social} />
                <div className="upload-btn">
                    <img src={Upload}/>
                    <p>טען תמונה</p>
                    
                </div>
                <div className="student-details">
                    <p>שם פרטי (אנגלית)</p>
                    <input
                    name="firstName"
                    value={details.firstName}
                    onChange={this.handleValue}
                    >
                    </input>
                    <p>שם המשפחה (אנגלית)</p>
                    <input
                    name="lastName"
                    value={details.lastName}
                    onChange={this.handleValue}
                    ></input>
                    <p>טלפון</p>
                    <input
                    className="phone"
                    name="phone"
                    value={details.phone}
                    onChange={this.handleValue}
                    ></input>
                    <div className="personal-code">
                        <p>קוד אישי</p>
                        <div className="code-input">
                            <input
                            name="code"
                            value={details.code}
                            onChange={this.handleValue}
                            ></input>
                            <Share />
                        </div>
                    </div>
                </div>
                <div className="save-btn">
                    שמור
                </div>
            </div>
        )

    }
}

export default AddNewStudent;