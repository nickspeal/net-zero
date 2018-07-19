import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class PeriodPicker extends Component {
  //Props
  // period
  // onChange

  render() {
    return (
      <Row className="selector">
        <Col
          className={`green ${
            this.props.period === "weekly" ? "shadow" : ""
          }`}
          onClick={() => {
            this.props.onChange("weekly");
          }}
        >
          <h4>Past Week</h4>
        </Col>
        <Col
          className={`yellow  ${
            this.props.period === "monthly" ? "shadow" : ""
          }`}
          onClick={() => {
            this.props.onChange("monthly");
          }}
        >
          <h4>Past Month</h4>
        </Col>
        <Col
          className={`red  ${
            this.props.period === "yearly" ? "shadow" : ""
          }`}
          onClick={() => {
            this.props.onChange("yearly");
          }}
        >
          <h4>Past Year</h4>
        </Col>
      </Row>
    );
  }
}

export default PeriodPicker;
