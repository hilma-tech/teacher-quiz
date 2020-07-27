import { observable, decorate, action, runInAction, extendObservable, computed } from 'mobx';
import superAuthFetch from '../superFetch';


class StudentsStore {
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
        if(err){
          return  console.log('err', err);
        }
        else {
            return console.log('res', res);
        }
    }

}







decorate(StudentsStore, {
    newStudentData: observable,
    students: observable,
    addNewStudent: action

    //(observable, computed, action)
});


export default new StudentsStore;