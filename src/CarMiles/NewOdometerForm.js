import React, { Component } from "react";
import moment from 'moment';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import Button from '../Chrome/Button';


class NewOdometerForm extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"), // STRING
    odometer: undefined,
  }

  onNextOdometerSubmit = () => {
    console.log("submitted")
    const odometerReadings = [...this.props.odometerReadings, this.state.odometer];
    const dates = [...this.props.dates, this.state.date];
    this.setState({ odometer: undefined });
    this.props.onChange(odometerReadings, dates);
  }

  render() {
    return ([
      <span>New Odometer Reading:</span>,
      <DateInput date={this.state.date} onChange={(date) => this.setState({ date })} />,
      <OdometerInput value={this.state.odometer} onChange={(odometer) => this.setState({ odometer })} />,
      <Button onClick={this.onNextOdometerSubmit}>Submit</Button>,
    ]);
  }
}

export default NewOdometerForm;
