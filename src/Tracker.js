import React, { Component } from "react";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";

import MileageInput from "./MileageInput";
import OdometerChart from "./OdometerChart";
import ProgressChart from "./ProgressChart";
import Conversions from './Conversions';

const FORMAT = 'MM-DD-YYYY';
const PERIOD_CONVERSION = {
  'weekly': 7,
  'monthly': 30,
  'yearly': 365,
}

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.impact = JSON.parse(localStorage.getItem("impact"));
  }
  state = {
    period: 'weekly',
    usedMiles: 0,
    goal: 10000,
    noOldDate: false,
    showCumulative: false,
  }

  componentWillMount() {
    this.updateValue();
  }

  onNewMileage = (miles, date) => {
    const nextData = {...this.impact}
    nextData.running.transportation.push({miles, date});
    this.impact = nextData;
    // TODO: Update localStorage
    this.updateValue();
  };

  // Given a date, return the number of miles used on that date.
  fetchMilesPerDay(dateOfInterest) {
    console.log("Fetching Miles per day for date: ", dateOfInterest.calendar())
    const list = this.impact && this.impact.running && this.impact.running.transportation;
    if (list === undefined) {
      return undefined;
    }

    // Find the entry after the date of interest
    let nextIndex = list.findIndex(item => moment(item.date, FORMAT) > dateOfInterest);

    if (nextIndex === -1) {
      console.error("No date in the dataset is after date of interest.");
    }

    const milesElapsed = (list[nextIndex].miles - list[nextIndex - 1].miles);
    const daysElapsed = moment(list[nextIndex].date, FORMAT).diff(moment(list[nextIndex - 1].date, FORMAT), 'days');
    const milesPerDay = milesElapsed / daysElapsed;
    return milesPerDay;
  }

  // Compute progress towards goal
  // You've used 700 miles in this period
  updateValue = () => {
    let usedMiles = 0;
    const startDate = moment(
      this.impact && this.impact.running && this.impact.running.transportation && this.impact.running.transportation[this.impact.running.transportation.length - 1].date,
      FORMAT
    );
    const firstDateInData = moment(
      this.impact && this.impact.running && this.impact.running.transportation && this.impact.running.transportation[0].date,
      FORMAT
    );
    if (startDate.diff(firstDateInData, 'days') < PERIOD_CONVERSION[this.state.period]) {
      // Error: Not enough data to show this time range
      console.error('Not enough data to show this time range');
      console.log(this.impact)
      this.setState({ noOldDate: true });
      return;
    } else {
      this.setState({ noOldDate: false });
    }
    for (var i=1; i <= PERIOD_CONVERSION[this.state.period]; i++){
      console.log("i is ", i)
      const startDateCopy = startDate.clone();
      usedMiles += this.fetchMilesPerDay(startDateCopy.subtract(i, 'days'));
    }
    this.setState({ usedMiles });
  }

  onPeriodChange = (e) => {
    this.setState({ period: e.target.value }, this.updateValue);
  }

  render() {
    return (
      <Container>
      <Row>
      <Col>
        {!this.state.noOldDate ? (
          <div className="chart-container">
            <select name="period" value={this.state.period} onChange={this.onPeriodChange}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <ProgressChart current={this.state.usedMiles} goal={this.state.goal * PERIOD_CONVERSION[this.state.period] / 365} />
          </div>
        ) : (
          <span>Insufficient data to show this time range</span>
        )}
        <MileageInput updateTransportation={this.onNewMileage} />
        <Conversions miles={this.state.usedMiles} />
        <button onClick={() => this.setState({ showCumulative: !this.state.showCumulative })}>Toggle Chart</button>
        {this.state.showCumulative && (
          <OdometerChart data={this.impact.running.transportation} />
        )}
        </Col>
        </Row>
      </Container>);
  }
}
