import React, { Component } from "react";
import moment from 'moment';
import './CarMiles.css';

class OdometerHistory extends Component {
  state = {
    show: true,
  }

  removeEntry = (idx) => {
    const nextOdometerReadings = [...this.props.odometerReadings];
    const nextDates = [...this.props.dates];
    nextOdometerReadings.splice(idx, 1);
    nextDates.splice(idx, 1)
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
            {/* <td></td> */}
            <td>Date</td>
            <td>Odometer</td>
          </tr>
        </thead>
        <tbody>
          {this.props.odometerReadings.map((odom, index) => (
            <tr key={`${index}-${odom}`}>
              {/* <td><i className="fas fa-times-circle delete-button" onClick={() => this.removeEntry(index)}></i></td> */}
              <td>
                {moment( this.props.dates[index] ).format('MMMM Do YYYY')}
              </td>
              <td>{odom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ]);
  }
}

export default OdometerHistory;
