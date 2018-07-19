import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Mockdata from "./Mockdata";
import Tracker from "./Tracker";
import CarMiles from './CarMiles/CarMiles';
import "./newLayout.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
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
