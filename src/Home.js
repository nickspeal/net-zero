import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Menubar from './Menubar';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Menubar />
        <div className="main">
          <div className="top">
            <h1>Name - Company</h1>
            <img
              src="http://res.freestockphotos.biz/pictures/16/16907-illustration-of-a-globe-pv.png"
              width="40%"
            />
            <h2>Insert Slogan / Mission/Vision Statement</h2>
          </div>
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
