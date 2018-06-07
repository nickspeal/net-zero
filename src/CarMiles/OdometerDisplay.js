import React, { Component } from 'react';
import Odometer from 'react-odometerjs';
import moment from 'moment';
import 'odometer/themes/odometer-theme-car.css';
import './CarMiles.css';

class OdometerDisplay extends Component {

  renderWarning = () => {
    const lastDate = moment(this.props.dates[this.props.dates.length -1],'YYYY-MM-DD')
    console.log('lastdate', lastDate);
    const age = moment().diff(lastDate, 'days')
    if (age > 1) {
      return (
        <div className="odometer-date redtext">
          {age} days old!
        </div>
      );
    } else {
      return (
        <div className="odometer-date greentext">
          Up to date!
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderWarning()}
        <Odometer
          value={this.props.odometerReadings[this.props.odometerReadings.length - 1]}
          format="(,ddd)"
          theme="car"
        />
      </div>
    );
  }
}

export default OdometerDisplay;
