import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './styles/scss/App.scss';
import Questions from './scenes/Questions';
import Test from './tts/test';
import Home from './scenes/Home';
import AnswersAndRecords from './scenes/Answers';


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/questions' component={Questions} />
        <Route exact path='/answers' component={AnswersAndRecords} />
        <Route exact path='/test' component={Test} />
      </Router>
    </div>
  );
}

export default App;
