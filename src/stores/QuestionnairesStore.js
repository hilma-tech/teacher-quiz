import { observable, decorate, action, runInAction, extendObservable, computed } from 'mobx';
import superAuthFetch from '../superFetch';


class QuestionnairesStore {
    //challenge data
    challenges = null;


    fetchHello = async () => {
        const [res, err] = await superAuthFetch('/challenges/hello');
        return res;
    }

}






decorate(QuestionnairesStore, {
    challenges: observable,
    fetchHello: action

    //(observable, computed, action)
});


export default new QuestionnairesStore;