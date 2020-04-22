import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Home from './Home';
import Test from './tts/test';


function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path='/'  component={Home}></Route>
      <Route exact path='/test'  component={Test}></Route>
      </Router>
    </div>
  );
}

export default App;
