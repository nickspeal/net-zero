import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from './auth/Login.js';
import CarMiles from './CarMiles/CarMiles';

import Profile from "./Profile";
import Mockdata from "./Mockdata";
import Tracker from "./Tracker";
import fourohfour from './404.js';

import "./newLayout.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/carmiles" component={CarMiles} />

          {/*
            These pages are an old legacy from the original hackathon MVP.
            Keep them around for now just in case their visualization logic is useful
            In order to make them work, first load mock data into localStorage by navigating to the /mockdata page
            Then go to /tracker to view the pretty stuff
            /profile also exists but isn't much visually. There might be some good code in there to take.
          */}
          <Route path="/profile" component={Profile} />
          <Route path="/mockdata" component={Mockdata} />
          <Route path="/tracker" component={Tracker} />
          <Route component={fourohfour} />
        </Switch>
      </Router>
    );
  }
}

export default App;
