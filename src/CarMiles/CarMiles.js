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

  onSetupComplete = (data) => {
    console.log("Setup complete with data: ", data);
    const dates = [data.date1, data.date2];
    const odometerReadings = [data.odometer1, data.odometer2];
    const nextState = { dates, odometerReadings, goal: data.goal, needsSetup: false };
    this.setState(nextState);
  }

  onHistoryChange = (odometerReadings, dates) => {
    console.log("submission received", odometerReadings);
    this.setState({ odometerReadings, dates });
  }

  render() {
    return (
      <SiteChrome>
        {this.state.needsSetup ? (
          <Setup onComplete={this.onSetupComplete} />
        ) : (
          <Row>
            <Col sm="4">
              <OdometerDisplay odometerReadings={this.state.odometerReadings} dates={this.state.dates} />
              <NewOdometerForm odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
              <OdometerHistory odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
              <HistoryViz odometerReadings={this.state.odometerReadings} dates={this.state.dates} goal={this.state.goal} />
            </Col>
          </Row>
        )}
      </SiteChrome>
    );
  }
}

export default CarMiles;
