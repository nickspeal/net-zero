import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
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
        <div className="main">
          <h1>Name - Company</h1>
          <img
            src="http://res.freestockphotos.biz/pictures/16/16907-illustration-of-a-globe-pv.png"
            width="40%"
          />
          <h2>Insert Slogan / Mission/Vision Statement</h2>
          <table>
            <tbody>
              <tr>
                <td><Link to="/tracker">Car</Link></td>
                <td>Lightning/Water</td>
              </tr>
              <tr>
                <td>WM Recycling</td>
                <td>Cow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
