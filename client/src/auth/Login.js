import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'reactstrap';
import SiteChrome from '../Chrome/SiteChrome';
import API from '../api/api.js';
import '../App.css';

class Login extends Component {
  state = {
    formType: 'signup',
  }

  handleSignUp = () => {
    const email = document.getElementById('email').value;
    const pw1 = document.getElementById('password1').value;
    const pw2 = document.getElementById('password2').value;
    console.log(pw1, pw2);
    if (pw1 !== pw2) {
      console.error("PWs dont match");
    } else {
      API.signup(email, pw1).then( () => {
        console.log("Signup success. TODO redirect home.")
        window.location.push('/');
      })
    }
  }

  handleSignIn = () => {
    console.log("todo sign in");
  }

  renderSignUpForm = () => (
    <Form>
      <Button color="secondary" disabled onClick={() => this.setState({ formType: 'signup' })}>
        Sign Up
      </Button>
      <Button color="primary" onClick={() => this.setState({ formType: 'signin' })}>
        Sign In
      </Button>
        <Col sm="12">
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
          />
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm Password"
          />
          <Button color="primary" block onClick={this.handleSignUp}>
            Sign Up
          </Button>
        </Col>
    </Form>
  )

  renderSignInForm = () => (
    <Form>
      <Button color="primary" onClick={() => this.setState({ formType: 'signup' })}>
        Sign Up
      </Button>
      <Button color="secondary" onClick={() => this.setState({ formType: 'signin' })}>
        Sign In
      </Button>
        <Col sm="12">
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
          />
          <Button color="primary" block onClick={this.handleSignIn}>
            Sign In
          </Button>
        </Col>
    </Form>
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
