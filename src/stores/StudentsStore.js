import { observable, decorate, action, runInAction, extendObservable, computed } from 'mobx';
import superAuthFetch from '../superFetch';

class StudentsStore {
    constructor(TeacherStore) {
        this.TeacherStore = TeacherStore
    }
    students = null;
    newStudentData = {
        userName: 'john smith',
        code: '546856',
        createdAt: new Date(),
        updatedAt: new Date()
    }


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
        const [res, err] = await superAuthFetch('/user');
        console.log('res: ', res);
        return res;
    }

}




decorate(StudentsStore, {
    newStudentData: observable,
    students: observable,
    addNewStudent: action,
    getStudentList: action

    //(observable, computed, action)
});


export default StudentsStore;