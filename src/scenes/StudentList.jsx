import React, { Component } from 'react';
import '../styles/scss/student-list.scss';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, Add } from '@material-ui/icons';
import DefaultImage from '../images/default-profile.png';
import DropDownArrow from '../images/chevron.svg';


// const studentCard = ({ student }) => {
//     return (
//         <div className="student-card">
//             <img
//                 className="profile-img"
//                 src={student.image ? student.image : DefaultImage}>
//             </img>
//             <div>{student.name}</div>
//             <div>
//                 <Star />
//                 {student.score}
//             </div>
//         </div>
//     )
// }

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                { name: 'Or Cohen', score: 80 },
                { name: 'Tom Trager', score: 80 },
                { name: 'Peter Capaldy', score: 80 },
                { name: "Matt Smith", score: 80 },
                { name: "Amir Alon", score: 80 },
                { name: 'Noy Levi', score: 80 },
                { name: 'John Do', score: 80 }
            ]
        }
    }

    render() {
        return (
            <div className="student-list">
                <div className="top-bar">
                    <Menu />
                </div>
                <h1>Students</h1>
                <div className="list">
                {this.state.students.map((student) => {
                    return (
                        <Link to="student-info" className="link">
                        <div className="student-card">
                            <div className="name">{student.name}</div>
                            <div className="score">
                                <Star />
                                {student.score}
                            </div>
                        </div>
                        </Link>
                    )
                })}
                </div>
                <div className="plus-btn">
                    <div className="plus-sign">
                        <Link to="add-new-student">
                            <Add />
                        </Link>
                    </div>
                </div>
            </div>
        )

    }
}

export default StudentList;