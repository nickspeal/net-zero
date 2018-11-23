import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'reactstrap';
import SiteChrome from '../Chrome/SiteChrome';
import API from '../api/api.js';
import '../App.css';

class Login extends Component {
  state = {
    formType: 'signup',
  }

  onLoginSuccess = (response) => {
    if (response.status <= 201) {
      response.json().then(user => {
        localStorage.setItem('username', user.username)
        localStorage.setItem('campaign', user.campaigns && user.campaigns[0].id)
        window.location = '/';
      });
    } else {
      response.text().then(alert);
      console.error(response);
    }
  }

  handleSignUp = () => {
    const email = document.getElementById('email').value;
    const pw1 = document.getElementById('password1').value;
    const pw2 = document.getElementById('password2').value;
    if (pw1 !== pw2) {
      alert("PWs dont match");
    } else {
      API.signup(email, pw1).then(this.onLoginSuccess).catch(console.error)
    }
  }

  handleSignIn = () => {
    const email = document.getElementById('email').value;
    const pw = document.getElementById('password3').value;
    API.login(email, pw).then(this.onLoginSuccess).catch(console.error)
  }

  renderSignUpForm = () => (
    <Col className="center login-form">
      <Form className="login-form">
        <Button color="secondary" disabled onClick={() => this.setState({ formType: 'signup' })}>
          Sign Up
        </Button>
        <Button color="primary" onClick={() => this.setState({ formType: 'signin' })}>
          Sign In
        </Button>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
            />
            <Input
              type="password"
              name="password1"
              id="password1"
              placeholder="Password"
              disabled
              title="Coming Soon... For now this account is not password protected"
            />
            <Input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
              disabled
              title="Coming Soon... For now this account is not password protected"
            />
            <Button color="primary" block onClick={this.handleSignUp}>
              Sign Up
            </Button>
      </Form>
    </Col>
  )

  renderSignInForm = () => (
    <Col className="center login-form">
      <Form className="login-form">
        <Button color="primary" onClick={() => this.setState({ formType: 'signup' })}>
          Sign Up
        </Button>
        <Button color="secondary" onClick={() => this.setState({ formType: 'signin' })}>
          Sign In
        </Button>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <Input
          type="password"
          name="password3"
          id="password3"
          placeholder="Password"
          disabled
          title="Coming Soon... For now this account is not password protected"
        />
        <Button color="primary" block onClick={this.handleSignIn}>
          Sign In
        </Button>
      </Form>
    </Col> 
  )

  render() {
    return (
      <SiteChrome>
        <Row>
        {this.state.formType === 'signup' ? this.renderSignUpForm() : this.renderSignInForm()}
        </Row>
      </SiteChrome>
    );
  }
}

export default Login;
