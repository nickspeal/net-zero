import React, { Component } from "react";
import moment from 'moment';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import Button from '../Chrome/Button';


class NewOdometerForm extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"), // STRING
    odometer: '',
  }

  onNextOdometerSubmit = () => {
    const odometerReadings = [...this.props.odometerReadings, this.state.odometer];
    const dates = [...this.props.dates, this.state.date];
    this.setState({ odometer: '' });
    this.props.onChange(odometerReadings, dates);
  }

  removeEntry = (idx) => {
    console.log("asked to delete entry #", idx)
    console.log("old readings", this.props.odometerReadings)
    const nextOdometerReadings = [...this.props.odometerReadings];
    const nextDates = [...this.props.dates];
    nextOdometerReadings.splice(idx, 1);
    nextDates.splice(idx, 1)
    console.log("nextreadings: ", nextOdometerReadings);
    this.props.onChange(nextOdometerReadings, nextDates);
  }

  render() {
    return ([
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Odometer</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {this.props.odometerReadings.map((odom, index) => (
            <tr key={`${index}-${odom}`}>
              <td>{this.props.dates[index]}</td>
              <td>{odom}</td>
              <td><Button onClick={() => this.removeEntry(index)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    ]);
  }
}

export default NewOdometerForm;
