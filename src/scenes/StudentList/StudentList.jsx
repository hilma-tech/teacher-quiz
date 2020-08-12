import React, { Component } from 'react';
import './student-list.scss';
import { inject, observer } from 'mobx-react';
import { Navbar, ListUnit, PlusBtn } from '../PageTools';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // students: [
            //     { name: 'Or Cohen', score: 80 },
            //     { name: 'Tom Trager', score: 80 },
            //     { name: 'Peter Capaldy', score: 80 },
            //     { name: "Matt Smith", score: 80 },
            //     { name: "Amir Alon", score: 80 },
            //     { name: 'Noy Levi', score: 80 },
            //     { name: 'John Do', score: 80 }
            // ]
        }
    }

    componentDidMount() {
        this.props.TeacherStore.StudentsStore.getStudentList()
    }


    render() {
        const { allStudents } = this.props.TeacherStore.StudentsStore;
        return (
            <div className="student-list">
                <Navbar mode={1} />

                <h1>Students</h1>

                <div className='students-container'>
                    {allStudents && allStudents.map(({ userName, code, id }, i) =>
                        <ListUnit
                            key={id}
                            index={i}
                            mode={2}
                            info={{
                                id,
                                title: userName,
                                //  TODO add student's score from studentAnswer table 
                                numInfo: 20
                            }}
                        />
                    )}
                </div>
                <PlusBtn redirect='/add-new-student' />
            </div>
        )
    }
}

export default inject('TeacherStore')(observer(StudentList));
