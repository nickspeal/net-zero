import React, { Component } from "react";
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../images/logo.jpg';

class SiteChrome extends Component {
  render() {
    return (
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="/">
              <img src={logo} height={40} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/#/carmiles">
              Track your miles
            </NavLink>
          </NavItem>
        </Nav>
        {this.props.children}
      </Container>
    );
  }
}

export default SiteChrome;
