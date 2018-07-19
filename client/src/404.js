import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import SiteChrome from './Chrome/SiteChrome';
import './App.css';

const ICON_SIZE = 'fa-9x';

class Home extends Component {
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

export default Home;
