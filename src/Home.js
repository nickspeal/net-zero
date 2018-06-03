import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Menubar from './Menubar';
import './App.css';

const ICON_SIZE = 'fa-9x';

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
                <td><Link to="/tracker"><i class={`fas fa-car ${ICON_SIZE}`}></i></Link></td>
                <td><Link to="/tracker"><i class={`fas fa-bolt ${ICON_SIZE}`}></i></Link></td>
              </tr>
              <tr>
                <td><Link to="/tracker"><i class={`fas fa-recycle ${ICON_SIZE}`}></i></Link></td>
                <td><Link to="/tracker"><i class={`fas fa-utensils ${ICON_SIZE}`}></i></Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
