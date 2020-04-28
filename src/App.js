import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Questions from './Questions';
import Test from './tts/test';
import Home from './Home';
import AnswersAndRecords from './Answers';


function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path='/'  component={Home}></Route>
      <Route exact path='/questions'  component={Questions}></Route>
      <Route exact path='/answers'  component={AnswersAndRecords}></Route>
      <Route exact path='/test'  component={Test}></Route>
      </Router>
    </div>
  );
}

export default App;
