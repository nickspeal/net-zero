import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input FormText } from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default class MileageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newOdometer: null,
            newDate: moment
    }

    handleChange = event => {
        this.setState({ newOdometer: parseInt(event.target.value) });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    handleDateChange = date => {
        this.setState({ newDate: date });
    };

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col sm="8">
                                <FormGroup>
                                    <Label for="odometer">
                                        New Odometer reading:
                                    </Label>
                                    <Input
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        type="number"
                                        name="odometer"
                                        id="odometer"
                                        placeholder="new odometer reading...."
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="4">
                                <FormGroup>
                                    <Label for="data">Date</Label>
                                    <DatePicker
                                        selected={this.state.newDate}
                                        onChange={this.handleDateChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row />
                </Container>
            </div>
        );
    }
}
