import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./newLayout.css";
import Mockdata from "./Mockdata";
import layout from "./images/APP_V2.jpg";

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
                <img src={layout} className="page-height" alt="Click to continue to tracker" />
              </div>
            </Col>
          </Row>
        </Container>
        <h1>Click Anywhere to Continue!</h1>
        <Mockdata />
      </div>
    );
  }
}
