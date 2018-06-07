import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import moment from 'moment';
import SiteChrome from '../Chrome/SiteChrome';
import Setup from './Setup';
import OdometerDisplay from './OdometerDisplay';
import NewOdometerForm from './NewOdometerForm';
import OdometerHistory from './OdometerHistory';
import HistoryViz from './HistoryViz';
import Button from '../Chrome/Button';


class CarMiles extends Component {
  state = {
    needsSetup: true,
    dates: [],
    odometerReadings: [],
    goal: undefined,
    nextDate: moment().format("YYYY-MM-DD"), // STRING
    nextOdometer: undefined,
  }

  componentWillMount() {
    this.loadStateFromLocalStorage();
  }

  loadStateFromLocalStorage = () => {
    const goal = localStorage.getItem('car-annual-goal');
    const dates = JSON.parse(localStorage.getItem('car-odometer-dates'));
    const odometerReadings = JSON.parse(localStorage.getItem('car-odometer-values'));

    if (
      !goal
      || !dates
      || !odometerReadings
      || !dates.length
      || dates.length < 2
      || !odometerReadings.length
      || odometerReadings.length < 2
    ) {
      this.setState({needsSetup: true});
    } else {
      const nextState = { goal, dates, odometerReadings, needsSetup: false };
      this.setState(nextState);
    }
  }

  onSetupComplete = (data) => {
    const dates = [data.date1, data.date2];
    const odometerReadings = [data.odometer1, data.odometer2];
    localStorage.setItem('car-annual-goal', data.goal);
    this.onHistoryChange(odometerReadings, dates)
  }

  onHistoryChange = (odometerReadings, dates) => {
    localStorage.setItem('car-odometer-values', JSON.stringify(odometerReadings));
    localStorage.setItem('car-odometer-dates', JSON.stringify(dates))
    this.loadStateFromLocalStorage();
  }

  render() {
    return (
      <SiteChrome>
        {this.state.needsSetup ? (
          <Setup onComplete={this.onSetupComplete} />
        ) : (
          <Row>
            <Col sm="6" className='center'>
              <h2 className="title">Track Your Miles</h2>
              <i className="fas fa-car fa-4x fa-center" />
              <OdometerDisplay odometerReadings={this.state.odometerReadings} dates={this.state.dates} />
              <NewOdometerForm odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
              <br />
              <HistoryViz odometerReadings={this.state.odometerReadings} dates={this.state.dates} goal={this.state.goal} />
              <OdometerHistory odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
            </Col>
          </Row>
        )}
      </SiteChrome>
    );
  }
}

export default CarMiles;
