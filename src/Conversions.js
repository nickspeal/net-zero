import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { PERIOD_CONVERSION } from './Tracker.js';
import "./App.css";

// Equivalents per mile
const EQUIVALENTS = {
  co2: 1690 / 2000,
  trees: 20 / 2000,
  dollars: 8.43 / 2000
};

class Conversions extends Component {
  // Props:
  // miles
  //goal
  //period

  render() {
    return [
      <Row className="my-4">
        <Col className="spacer">
          <h5>
            Distance Traveled: {this.props.miles.toFixed(2)} miles
          </h5>
        </Col>
        <Col className="spacer">
          <h5>
            Goal:{" "}
            {(
              this.props.goal *
              PERIOD_CONVERSION[this.props.period] /
              365
            ).toFixed(0)}{" "}
            miles
          </h5>
        </Col>
      </Row>,
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
          <h5>{(this.props.miles * EQUIVALENTS["co2"]).toFixed(1)} lbs</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>Trees Required To Offset</h5>
        </Col>
        <Col className="spacer">
          <h5>{(this.props.miles * EQUIVALENTS["trees"]).toFixed(0)}</h5>
        </Col>
      </Row>,
      <Row>
        <Col className="spacer">
          <h5>Dollars Required To Offset</h5>
        </Col>
        <Col className="spacer">
          <h5>${(this.props.miles * EQUIVALENTS["dollars"]).toFixed(2)}</h5>
        </Col>
      </Row>,
      <Row>
        {/* <Col className=""> */}
        <Button
          color="success py-2"
          block
          onClick={() => (window.location = "https://www.facebook.com/donate/243977393066656/10211932303200021/")}
        >
          Offset Now!
        </Button>
        {/* </Col> */}
      </Row>
    ];
  }
}

export default Conversions;
