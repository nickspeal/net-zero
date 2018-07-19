import React, { Component } from 'react';
import moment from 'moment';
const FORMAT = 'MM-DD-YYYY';
const PERIOD_CONVERSION = {
  'weekly': 7,
  'monthly': 30,
  'yearly': 365,
}

class Profile extends Component {
  state = {
    period: 'monthly',
    usedMiles: 0,
  }

  componentWillMount() {
    this.impact = JSON.parse(localStorage.getItem("impact"));
    this.processData();
  }

  onPeriodChange = (e) => {
    this.setState({ period: e.target.value }, this.computeProgress);
  }

  processData = () => {
    // data as a list of date, value pairs
    // Can interpret this as a list of miles/day ranges.
    // Starting from the second element, the value is the difference/numdays applied to each of the days in the interval

    // If we want to visualize say, monthly then here's the algorithm:
    // Find the last date less than the month start
    // Find the next date and compute the miles/day
    // If nextDate > monthEnd, then numDays = monthlength
    // else numDays = nextDate - firstDate
    // total = 0; total += miles/day * numDays
    // if current date > monthLength then exit, else continue with incrementing the dates

    // Should apply to days or years also

    const t = this.impact && this.impact.running && this.impact.running.transportation;
    this.viz = t;
  }

  // Given a date, return the number of miles used on that date.
  fetchMilesPerDay(dateOfInterest) {
    const list = this.impact && this.impact.running && this.impact.running.transportation;

    // Find the entry after the date of interest
    const nextIndex = list.findIndex(item => moment(item.date, FORMAT) > dateOfInterest);

    const milesElapsed = (list[nextIndex].miles - list[nextIndex - 1].miles);
    const daysElapsed = moment(list[nextIndex].date, FORMAT).diff(moment(list[nextIndex - 1].date, FORMAT), 'days');
    const milesPerDay = milesElapsed / daysElapsed;
    return milesPerDay;
  }

  // Compute progress towards goal
  // You've used 700 miles in this period
  computeProgress = () => {
    let usedMiles = 0;
    for (var i=0; i < PERIOD_CONVERSION[this.state.period]; i++){
      usedMiles += this.fetchMilesPerDay(moment().subtract(i, 'days'));
    }
    this.setState({ usedMiles });
  }

  render() {
    const t = this.impact && this.impact.running && this.impact.running.transportation;
    const totalMiles = t && Number(t[t.length -1].miles) - Number(t[0].miles);

    return t ? (
      <div>
        Total mileage: {totalMiles} miles.
        Used miles: {this.state.usedMiles.toFixed(0)} miles.
        <br />
        <ul>
          {this.viz.map(item => <li>{item.date},  {item.miles}</li>)}
        </ul>
        <hr />
        <h2> Current {this.state.period} Progress </h2>
        <select name="period" value={this.state.period} onChange={this.onPeriodChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>


      </div>
    ) : (
      <div>
        No Data Found. Please fill out the survey or track your usage!
      </div>
    );
  }
}

export default Profile;
