import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

class Profile extends Component {
  componentWillMount() {
    this.impact = localStorage.getItem("impact")
  }

  render() {
    return (
      <div>
        Profile goes here!
        <br />
        {this.impact || "No data in localStorage"}
      </div>
    );
  }
}

export default Profile;
