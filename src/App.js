import React, { Component } from 'react';
import Home from './Home';
import Profile from './Profile';
import Mockdata from './Mockdata';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/survey">Survey</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/tracker">Track My Data</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/mockdata" component={Mockdata}/>
        </div>
      </Router>
    );
  }
}

export default App;
