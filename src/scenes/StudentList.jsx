import React, { Component } from 'react';
import '../styles/scss/student-list.scss';
import { Navbar, ListUnit, PlusBtn } from '../components/PageTools';

export default class StudentList extends Component {
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
        const { students } = this.state;

        return (
            <div className="student-list">
                <Navbar mode={1} />

                <h1>Students</h1>

                <div className='students-container'>
                    {students.map(({ name, score }) =>
                        <ListUnit
                            mode={2}
                            info={{
                                title: name,
                                numInfo: score
                            }}
                        />
                    )}
                </div>

                <PlusBtn />
            </div>
        )

    }
}
