import React, { Component } from 'react';
import Home from './Home';
import Profile from './Profile';
import Mockdata from './Mockdata';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/mockdata" component={Mockdata}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
