import React, { Component } from 'react';
import '../styles/scss/add-new-student.scss';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Share } from '@material-ui/icons';
import Social from '../images/social.svg';
import Upload from '../images/upload.svg';
import { Navbar} from '../components/PageTools';



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
                <Navbar mode={3}/>
                    <h1>New Student</h1>
                <div className="student-details">
                    <p>First Name</p>
                    <input
                    name="firstName"
                    value={details.firstName}
                    onChange={this.handleValue}
                    >
                    </input>
                    <p>Last Name</p>
                    <input
                    name="lastName"
                    value={details.lastName}
                    onChange={this.handleValue}
                    ></input>
                    <div className="personal-code">
                        <p>Personal Code</p>
                        <div className="code-input">
                            <Share />
                            <input
                            name="code"
                            value={details.code}
                            onChange={this.handleValue}
                            ></input>
                        </div>
                    </div>
                </div>
                <div 
                className="save-btn"
                onClick={this.props.StudentsStore.addNewStudent}
                >
                    Save
                </div>
            </div>
        )

    }
}


export default inject('StudentsStore')(observer(AddNewStudent));
