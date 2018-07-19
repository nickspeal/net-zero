import React, { Component } from 'react';
import { Row } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import SiteChrome from './Chrome/SiteChrome';
import './App.css';

class fourohfour extends Component {
  render() {
    return (
      <SiteChrome>
        <Row className="home-row">
          <h3>The page you requested could not be found. <Link to="/">Go Home?</Link></h3>
        </Row>
      </SiteChrome>
    );
  }
}

export default fourohfour;
