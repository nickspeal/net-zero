import React, { Component } from "react";
import moment from 'moment';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import Button from '../Chrome/Button';
import './CarMiles.css'

class NewOdometerForm extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"), // STRING
    odometer: undefined,
  }

  onNextOdometerSubmit = () => {
    const odometer = Number(this.state.odometer); // Should aleady be a number from odometerInput, but can't hurt.
    if (!isNaN(odometer) && odometer >= Math.max(...this.props.odometerReadings)) {
      const odometerReadings = [...this.props.odometerReadings, this.state.odometer];
      const dates = [...this.props.dates, this.state.date];
      this.setState({ odometer: undefined });
      this.props.onChange(odometerReadings, dates);
    } else {
      console.error(`Cannot submit odometer value: ${this.state.odometer}. Its either not a number or lower than one of the other values in the array`);
    }

  }

  render() {
    return ([
      <DateInput date={this.state.date} onChange={(date) => this.setState({ date })} />,
      <OdometerInput value={this.state.odometer} onChange={(odometer) => this.setState({ odometer })} />,
      <Button onClick={this.onNextOdometerSubmit} className="button-inverted full-width">Submit a new reading</Button>,
    ]);
  }
}

export default NewOdometerForm;
