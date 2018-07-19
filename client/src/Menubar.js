import React, { Component } from "react";
// import { HashRouter as Link } from "react-router-dom";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

class Menubar extends Component {
  render() {
    return (
      <div className="menubar">
        <ul className="menulist">
          <li>Home</li>
          <li><Link to="/profile">Account</Link></li>
          <li>Monitor</li>
          <li>Sharing</li>
          <li>Acheivements</li>
          <li>Challenge</li>
          <li>Offset</li>
          <li>Green tips</li>
        </ul>
      </div>
    );
  }
}

export default Menubar;
