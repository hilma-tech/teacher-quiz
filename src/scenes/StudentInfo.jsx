import React, { Component } from 'react';
import '../styles/scss/student-info.scss';
import { Link } from 'react-router-dom';
import { Star, ArrowBack, } from '@material-ui/icons';
import Social from '../images/social.svg';

class StudentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentDetails: { name: 'Or Cohen', score: 80 },
            challenges: [
                { category: 'Capital City', score: 80, unitName: '123456' },
                { category: 'Capital City', score: 80, unitName: '123456' },
                { category: 'Capital City', score: 80, unitName: '123456' },
                { category: 'Capital City', score: 80, unitName: '123456' },
                { category: 'Capital City', score: 80, unitName: '123456' },
                { category: 'Capital City', score: 80, unitName: '123456' },
            ]
        }
    }

    render() {
        let { studentDetails, challenges } = this.state
        return (
            <div className="student-info">
                <div className="top-bar">
                    <ArrowBack />
                </div>
                <h1>{studentDetails.name}</h1>
                <div className='total-score'>
                    <div>
                        {studentDetails.score}
                    </div>
                    <Star />
                </div>
                {
                    challenges &&
                    challenges.map((challenge) => {
                        return (
                            <Link to="student-quiz-info" className="link">
                            <div className="challenge-unit">
                                <div className="left-side">
                                    <div className="category">{challenge.category}</div>
                                    <div className="unit-name">{challenge.unitName}</div>
                                </div>
                                <div className="score">
                                    <Star />
                                    <div>
                                        {challenge.score}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        )
                    })
                }
            </div>
        )

    }
}

export default StudentInfo;