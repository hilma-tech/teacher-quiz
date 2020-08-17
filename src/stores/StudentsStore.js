import { observable, decorate, action, runInAction, extendObservable, computed } from 'mobx';
import superAuthFetch from '../superFetch';

class StudentsStore {
    constructor(TeacherStore) {
        this.TeacherStore = TeacherStore
    }

    newStudentData = {
        userName: 'john smith',
        code: '546856',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    allStudents= [];

    addNewStudent = async () => {
        console.log('hereeeee');
        const [res, err] = await superAuthFetch('/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.newStudentData)
        });
        console.log('after post');
        if (err) {
            return console.log('err', err);
        }
        else {
            return console.log('res', res);
        }
    }

    getStudentList = async () => {
        console.log('in heree')
        const [res, err] = await superAuthFetch('/challengestock?filter=1' 
        // + JSON.stringify({
        //     where: { id: 1 }
        // })
        );
        console.log('res: ', res);
        this.allStudents = res
        return;
    }

}




decorate(StudentsStore, {
    allStudents: observable,
    newStudentData: observable,
    addNewStudent: action,
    getStudentList: action

    //(observable, computed, action)
});


export default StudentsStore;