import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, jjFormText } from "reactstrap";
import moment from "moment";

export default class MileageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miles: undefined,
      date: moment().format("MM-DD-YYYY")
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

  handleDateChange = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Input
                  value={this.state.miles}
                  onChange={this.handleChange}
                  type="number"
                  name="odometer"
                  id="odometer"
                  placeholder="new odometer reading...."
                />
              </FormGroup>
            </Col>
            <Col sm="6">
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
