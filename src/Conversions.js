import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import './App.css';

// Equivalents per mile
const EQUIVALENTS = {
  'co2': 1690 / 2000,
  'trees': 20 / 2000,
  'dollars': 8.43 / 2000,
}

class Conversions extends Component {
  // Props:
  // miles
  render() {
    return ([
      <Row>
        <Col className="spacer">
          <h5>Distance Traveled</h5>
        </Col>
        <Col className="spacer">
          <h5>{this.props.miles.toFixed(0)} miles</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>CO2 Emitted</h5>
        </Col>
        <Col className="spacer">
          <h5>{(this.props.miles * EQUIVALENTS['co2']).toFixed(1)} lbs</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>Trees Required To Offset</h5>
        </Col>
        <Col className="spacer">
          <h5>{(this.props.miles * EQUIVALENTS['trees']).toFixed(0)}</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>Dollars Required To Offset</h5>
        </Col>
        <Col className="spacer">
          <h5>${(this.props.miles * EQUIVALENTS['dollars']).toFixed(2)}</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>Offset Now!</h5>
        </Col>
      </Row>,
    ]);
  }
}

export default Conversions;
