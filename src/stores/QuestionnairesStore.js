import { observable, decorate, action, runInAction, extendObservable, computed } from 'mobx';
import superAuthFetch from '../superFetch';

const fakeQuizes = [
    {
        id: 1,
        category: 'My First Quize',
        unitName: '123456',
        ansNum: 25
    },
    {
        id: 2,
        category: 'Capital City',
        unitName: '123456',
        ansNum: 25
    },
    {
        id: 3,
        category: 'Food Quize',
        unitName: '123456',
        ansNum: 25
    },
    {
        id: 4,
        category: 'Words',
        unitName: '123456',
        ansNum: 25
    },
    {
        id: 5,
        category: 'Israel',
        unitName: '123456',
        ansNum: 25
    },
    {
        id: 6,
        category: 'Shir',
        unitName: '123456',
        ansNum: 25
    }]

class QuestionnairesStore {
    constructor(TeacherStore) {
        this.TeacherStore = TeacherStore
    }
    //challenge data
    quizes = fakeQuizes;
    challenges = null;
    challengeQuestions = [];
    currentQuizeId = null;

    fetchHello = async () => {
        const [res, err] = await superAuthFetch('/challenges/hello');
        return res;
    }

    get quizeTitle() {
        let obj = this.quizes.find(q => q.id == this.currentQuizeId)
        if (!obj) return ''
        else return obj.category;
    }

    getQuestionsByChallengeId(id) {
        //TODO fetch from DB
        console.log({ fakeData, id, })
        this.challengeQuestions = fakeData[id];
    }

}

decorate(QuestionnairesStore, {
    quizes: observable,
    challenges: observable,
    fetchHello: action,
    challengeQuestions: observable,
    getQuestionsOfChallenge: action,
    quizeTitle: computed

    //(observable, computed, action)
});


const fakeData = {
    1: [
        { question: { value: 'סתם שאלה?' }, answers: [{ value: 'תשובה כלשהי' }, { value: 'תשובה אחרת' }] }
    ],
    2: [
        { question: { value: '' } },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'ירושלים' }, { value: 'ירושלים' }] },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'תל אביב' }] },
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }

    ],
    3: [
        { question: { value: 'איזה מאכלים בצבע ירוק יש?' }, answers: [{ value: 'תפוח' }, { value: 'אגס' }] },
        { question: { value: 'איזה פירות אתה מכיר' }, answers: [{ value: 'לימון' }] }
    ],
    4: [
        { question: { value: 'שאלה כלשהי?' }, answers: [{ value: 'מילה' }] },
        { question: { value: 'עוד שאלה?' }, answers: [{ value: 'עוד מילה' }] }
    ],
    5: [
        { question: { value: '?מה היא עיר הבירה של ישראל' }, answers: [{ value: 'חיפה' }] }
    ],
    6: [
        { question: { value: '' } },
        { question: { value: 'שאלה מספר אחת?' }, answers: [{ value: 'משהו' }, { value: 'ככה' }] },
        { question: { value: 'שאלה מספר שתיים?' }, answers: [{ value: 'מילהה' }] },
    ]
}

export default QuestionnairesStore;
