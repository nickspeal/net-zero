import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Mockdata from "./Mockdata";
import Tracker from "./Tracker";
import Front from "./Front";
import CarMiles from './CarMiles/CarMiles';

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="/net-zero">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/mockdata" component={Mockdata} />
          <Route path="/tracker" component={Tracker} />
          <Route path="/carmiles" component={CarMiles} />
        </Switch>
      </Router>
    );
  }
}

export default App;
