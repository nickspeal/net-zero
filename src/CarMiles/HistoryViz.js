import React, { Component } from "react";
import moment from 'moment';
import ColumnChart from './ColumnChart';

const PERIOD_LENGTH = 7; // DAys hardcoded for now
const DATE_FORMAT = 'YYYY-MM-DD';

class HistoryViz extends Component {
  state = {
    period: 'weekly',
    bucketNames: [],
    bucketValues: [],
  }

  componentWillMount() {
    this.compute();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.odometerReadings !== this.props.odometerReadings || prevProps.dates !== this.props.dates) {
      console.log("new props: ", this.props);
      this.compute();
    } else {
      console.log("Updated with no new props: ", this.props)
    }
  }

  // Measure the miles traveled on the interval between the previousDate and currentDate
  // Assume sorted
  // TODO Possible performance speedup if needed: take arg for last index and start the search there. We know it's not before that one.
  computeMilesPerDay = (currentDate, odometerReadings, moment_dates) => {
    // Find the first date in the list after the current date
    // >= could be problematic when considering seconds. TODO figure this out
    const idx = moment_dates.findIndex(date => date >= currentDate);
    const milesElapsed = odometerReadings[idx] - odometerReadings[idx - 1]
    const daysElapsed = moment_dates[idx].diff(moment_dates[idx - 1], 'days');
    // console.log("Miles, Days elapsed, ratio: ", milesElapsed, daysElapsed, milesElapsed / daysElapsed);
    return milesElapsed / daysElapsed;
  }

  compute = () => {
    if (this.props.dates.length < 1 || this.props.odometerReadings.length < 1) {
      console.log("HistoryViz: Cannot visuzalize data of length 0");
      this.setState({ bucketNames: [], bucketValues: [] });
      return;
    }
    // Convert array of strings to array of moment objects
    const moment_dates = this.props.dates.map(date => moment(date, DATE_FORMAT));

    let bucketStartDate = moment_dates[0].clone();
    const finalDate = moment_dates[moment_dates.length - 1].clone();
    let currentDate = bucketStartDate.clone().add(1, 'days'); // Start counting on day 2 to measure diff over interval from day 1

    let periodTotalMiles = 0;
    let bucketNames = [];
    let bucketValues = [];

    // For each day between the start and end, add up the miles per day into buckets of length PERIOD_LENGTH:
    while (currentDate <= finalDate) {
      periodTotalMiles += this.computeMilesPerDay(currentDate, this.props.odometerReadings, moment_dates);

      // After summing up PERIOD_LENGTH daily values, push to bucket and then reset
      if (currentDate.diff(bucketStartDate, 'days') >= PERIOD_LENGTH) {
        // console.log("Period complete.");
        bucketNames.push(bucketStartDate.format('ll'));
        bucketValues.push(periodTotalMiles);

        bucketStartDate = moment(currentDate);
        periodTotalMiles = 0;
      }
      currentDate.add(1, 'days');
    }
    // Account for final incomplete period
    bucketNames.push(bucketStartDate.format('ll'));
    bucketValues.push(periodTotalMiles);

    this.setState({ bucketNames, bucketValues });
  }

  render() {
    return (
      <ColumnChart
        bucketNames={this.state.bucketNames}
        bucketValues={this.state.bucketValues}
        plotLine={this.props.goal / 52}
        title="Miles traveled per week"
      />
    );
  }
}

export default HistoryViz;
