import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, jjFormText } from "reactstrap";
import moment from "moment";

export default class MileageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miles: undefined,
      date: moment().format("YYYY-MM-DD"), // STRING
    };
  }

  handleChange = event => {
    this.setState({ miles: parseInt(event.target.value) });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateTransportation(this.state.miles, this.state.date);
    this.setState({ miles: undefined });
  };

  handleDateChange = event => {
    console.log("date changed from, to: ", this.state.date, event.target.value )
    this.setState({ date: event.target.value });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="4">
              <Input
                value={this.state.miles}
                onChange={this.handleChange}
                type="number"
                name="odometer"
                id="odometer"
                placeholder="Odometer"
              />
            </Col>
            <Col sm="4">
              <Input
                value={this.state.date}
                onChange={this.handleDateChange}
                type="date"
                name="date"
                id="date"
              />
            </Col>
            <Col sm="4">
              <Button color="primary" block type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
