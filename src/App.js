import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './scenes/App/App.scss';
import Questions from './components/Questions';
import Test from './tts/test';
import Home from './components/Home';
import Question from './components/Question';
import AnswersAndRecords from './components/Answers';
import OpeningPage from './scenes/OpeningPage/OpeningPage';
import StudentList from './scenes/StudentList/StudentList';
import ListStockQuizs from './scenes/ListStockQuizs/ListStockQuizs';
import StudentQuizInfo from './scenes/StudentQuizInfo/StudentQuizInfo';
import StudentInfo from './scenes/StudentInfo/StudentInfo';
import QuizInfo from './scenes/QuizInfo/QuizInfo';
import CreateChallenge from './scenes/CreateChallenge/CreateChallenge';
import AddNewStudent from './scenes/AddNewStudent/AddNewStudent';
import CreateNewQuestionnaire from './scenes/CreateNewQuestionnaire/CreateNewQuestionnaire';
// import {
//   OpeningPage, StudentList, ListStockQuizs,
//   StudentQuizInfo, StudentInfo, QuizInfo, CreateChallenge,
//   AddNewStudent, CreateNewQuestionnaire
// } from './scenes/index';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={OpeningPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/student-list' component={StudentList} />
          <Route exact path='/list-of-quiz' component={ListStockQuizs} />
          <Route exact path='/student-quiz-info' component={StudentQuizInfo} />
          <Route exact path='/student-info' component={StudentInfo} />
          <Route exact path='/quiz-info' component={QuizInfo} />
          <Route exact path='/create-challenge' component={CreateChallenge} />
          <Route exact path='/add-new-student' component={AddNewStudent} />
          <Route exact path='/question' component={Question} />
          <Route exact path='/create-new-questionnaire' component={CreateNewQuestionnaire} />

          <Route exact path='/questions' component={Questions} />
          <Route exact path='/answers' component={AnswersAndRecords} />
          <Route exact path='/test' component={Test} />
        </Switch>
      </Router>
    </div>
  );
}