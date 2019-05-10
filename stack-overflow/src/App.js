import React, { Component } from 'react';
import './App.css';
import SmartLoginView from './view/SmartLoginView';
import SmartQuestionView from "./view/SmartQuestionView";
import SmartAnswerView from "./view/SmartAnswerView";
import {HashRouter, Switch, Route} from "react-router-dom";

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact={true} component={SmartLoginView} path="/" />
            <Route exact={true} component={SmartQuestionView} path="/questions" />
            <Route exact={true} component={SmartAnswerView} path="/questions/question/:index" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
