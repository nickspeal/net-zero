import React, { Component } from "react";
import moment from 'moment';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import './CarMiles.css';

class NewOdometerForm extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"), // STRING
    odometer: '',
    show: false,
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
    if (!this.state.show) {
      return (
        <a
          onClick={() => this.setState({ show: true })}
          style={{ cursor: 'grab '}}
        >
          Show Odometer History...
        </a>
      )
    }
    return ([
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Date</td>
            <td>Odometer</td>
          </tr>
        </thead>
        <tbody>
          {this.props.odometerReadings.map((odom, index) => (
            <tr key={`${index}-${odom}`}>
              <td><i className="fas fa-times-circle delete-button" onClick={() => this.removeEntry(index)}></i></td>
              <td>{this.props.dates[index]}</td>
              <td>{odom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ]);
  }
}

export default NewOdometerForm;
