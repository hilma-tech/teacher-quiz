import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './styles/scss/App.scss';
import Questions from './scenes/Questions';
import Test from './tts/test';
import Home from './scenes/Home';
import AnswersAndRecords from './scenes/Answers';
import OpeningPage from './scenes/OpeningPage';
import StudentList from './scenes/StudentList';
import ListStockQuizs from './scenes/ListStockQuizs';
import StudentQuizInfo from './scenes/StudentQuizInfo';
import StudentInfo from './scenes/StudentInfo';
import QuizInfo from './scenes/QuizInfo';
import CreateChallenge from './scenes/CreateChallenge';
import AddNewStudent from './scenes/AddNewStudent';
import Question from './scenes/Question';
import CreateNewQuestionnaire from './scenes/CreateNewQuestionnaire';



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