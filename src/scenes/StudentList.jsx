import React, { Component } from 'react';
import '../styles/scss/student-list.scss';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, Add } from '@material-ui/icons';
import DefaultImage from '../images/default-profile.png';
import DropDownArrow from '../images/chevron.svg';


const studentCard = ({ student }) => {
    return (
        <div className="student-card">
            <img
                className="profile-img"
                src={student.image ? student.image : DefaultImage}>
            </img>
            <div>{student.name}</div>
            <div>
                <Star />
                {student.score}
            </div>
        </div>
    )
}

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                { name: 'אור כהן', score: 80, image: '' },
                { name: 'שלמה לוי', score: 80, image: '' },
                { name: 'תום טרגר', score: 80, image: '' },
                { name: "פיטר קפלדי", score: 80, image: '' },
                { name: "מאט סמית'", score: 80, image: '' },
                { name: 'אמיר אלון', score: 80, image: '' },
                { name: 'נוי כספי', score: 80, image: '' }
            ]
        }
    }

    render() {
        return (
            <div className="student-list">
                <div className="top-bar">
                    <Menu />
                    <Search />
                </div>
                <h1>רשימת תלמידים</h1>
                <div className="filter">
                    <select>
                        <option>כיתה ט</option>
                    </select>
                    <img src={DropDownArrow}/>
                </div>
                {this.state.students.map((student) => {
                    return (
                        <div className="student-card">
                            <img
                                className="profile-img"
                                src={student.image || DefaultImage}>
                            </img>
                            <div className="name">{student.name}</div>
                            <div className="score">
                                <Star />
                                {student.score}
                            </div>
                        </div>
                    )
                })}
                {/* {
                    this.state.students &&
                    this.state.students.map((student) => {
                        return (
                            <div className="student-info">
                                <img
                                    className="profile-img"
                                    src={student.image ? student.image : DefaultImage}>
                                </img>
                                <div>
                                    {student.name}
                                </div>
                                <div>
                                    <StarIcon />
                                    {student.score}
                                </div>
                            </div>
                        )
                    })
                } */}
                <div className="plus-btn">
                    <div className="plus-sign">
                    <Add />
                    </div>
                </div>
            </div>
        )

    }
}

export default StudentList;