import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        The problem is Carbon.
        The Solution is Action.
        <Link to="/survey">Find out your impact</Link>
      </div>
    );
  }
}

export default Home;
