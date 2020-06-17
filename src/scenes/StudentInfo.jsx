import React, { Component } from 'react';
import '../styles/scss/student-info.scss';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DropDownArrow from '../images/chevron.svg';
import Social from '../images/social.svg';

class StudentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: { name: 'אור כהן', grade: 'כיתה ט', image: '', score: 80 },
            challenges: [
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' },
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' },
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' },
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' },
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' },
                { category: 'ערי בירה', score: 80, uintNmae: 'שם היחידה' }
            ]
        }
    }

    render() {
        let details = this.state.studentDetails
        return (
            <div className="student-info">
                <div className="top-bar">
                    <ArrowForwardIcon />
                </div>
                <div className="student-details">
                    <img
                        className="profile-img"
                        src={details.image ? details.image : Social}>
                    </img>
                    <h1>{details.name + ' ' + details.grade}</h1>
                    <div className="total-score">
                        <StarIcon />
                        <h3>{details.score}</h3>
                    </div>


                </div>
                <div className="filter">
                   <select>
                       <option>כל היחידות</option>
                   </select>
                   <img src={DropDownArrow} />
                </div>
                {
                    this.state.challenges &&
                    this.state.challenges.map((challenge) => {
                        return (
                            <div className="challenge-unit">
                                <div className="category">{challenge.category}</div>
                                <div className="unit-name">{challenge.uintNmae}</div>
                                <div className="score">
                                    <StarIcon />
                                    <div>
                                        {challenge.score}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}

export default StudentInfo;