import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./newLayout.css";
// import Logo from "./images/logo-carbon-footprint.png";
import layout from "./images/APP.png";
import { Redirect } from "react-router-dom";

export default class Front extends Component {
  render() {
    return (
      <div>
        <Container>
          {/* <div className="whole-page">
            <Row>
              <Col className="no-gutters">
                <img src={Logo} alt="" height="100px" />
                <h1>TrAct</h1>
              </Col>
            </Row>
            <Row>
              <Col />
            </Row>
          </div> */}
          <Row>
            <Col>
              <div
                className="flexi"
                onClick={() => {
                  this.props.history.push("/tracker");
                }}
              >
                <img src={layout} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
