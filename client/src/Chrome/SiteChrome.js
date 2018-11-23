import React, { Component } from "react";
import { Container, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import '../App.css';

class SiteChrome extends Component {
  render() {
    return (
      <Container fluid>
        <Nav>
          <NavItem>
            <Link to="/">
              <img src={logo} height={40} alt="logo" />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/carmiles">
              Track your miles
            </Link>
          </NavItem>
          <NavItem className="pull-right">
            <Link to="/login">
              Login
            </Link>
          </NavItem>
        </Nav>
        {this.props.children}
      </Container>
    );
  }
}

export default SiteChrome;
