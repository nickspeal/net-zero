import React, { Component } from "react";
import { Container, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import '../App.css';

class SiteChrome extends Component {
  state = {
    isLoggedIn: false,
  }

  componentWillMount() {
    const isLoggedIn = !!localStorage.getItem('username') && !!localStorage.getItem('campaign');
    this.setState({ isLoggedIn });
  }

  logout = () => {
    console.log("logout")
    localStorage.removeItem('username');
    localStorage.removeItem('campaign');
    this.setState({ isLoggedIn: false });
  }

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
            { this.state.isLoggedIn ? (
              <a href='#' onClick={this.logout}>
                Log Out
              </a>
            ) : (
              <Link to="/login">
                Login
              </Link>
            )}
            
          </NavItem>
        </Nav>
        {this.props.children}
      </Container>
    );
  }
}

export default SiteChrome;
