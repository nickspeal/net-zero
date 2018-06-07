import React, { Component } from "react";
import { Container, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';

class SiteChrome extends Component {
  render() {
    return (
      <Container fluid>
        <Nav>
          <NavItem>
            <Link to="/">
              <img src={logo} height={40} />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/carmiles">
              Track your miles
            </Link>
          </NavItem>
        </Nav>
        {this.props.children}
      </Container>
    );
  }
}

export default SiteChrome;
