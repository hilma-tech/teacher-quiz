import QuestionnairesStore from './QuestionnairesStore';
import StudentsStore from './StudentsStore';
import { observable, decorate, action } from 'mobx';


class TeacherStore {
    constructor(TeacherStore) {
        this.TeacherStore = TeacherStore
    }
    QuestionnairesStore = new QuestionnairesStore(this);
    StudentsStore = new StudentsStore(this);
}

decorate(TeacherStore, {
    QuestionnairesStore: observable,
    StudentsStore: observable,
});

export default new TeacherStore();