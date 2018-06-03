import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, jjFormText } from "reactstrap";
import moment from "moment";

export default class MileageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miles: "",
      date: moment().format("MM-DD-YYYYY")
    };
  }

  handleChange = event => {
    this.setState({ miles: parseInt(event.target.value) });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateTransportation(this.state);
    this.setState({ miles: "" });
  };

  handleDateChange = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
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
            </Row>
            <Button color="primary" block type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
