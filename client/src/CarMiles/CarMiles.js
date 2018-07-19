import React, { Component } from "react";
import { Row, Col, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import moment from 'moment';
import API from '../api/api.js'
import SiteChrome from '../Chrome/SiteChrome';
import Setup from './Setup';
import OdometerDisplay from './OdometerDisplay';
import NewOdometerForm from './NewOdometerForm';
import OdometerHistory from './OdometerHistory';
import HistoryViz from './HistoryViz';
import classnames from 'classnames';

class CarMiles extends Component {
  state = {
    needsSetup: true,
    dates: [],
    odometerReadings: [],
    goal: undefined,
    nextDate: moment().format("YYYY-MM-DD"), // STRING
    nextOdometer: undefined,
    activeTab: '1',
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
    API.updateHistory(odometerReadings.map(
      (o,i) => ({ odometer: o, date: dates[i] })
    ));
    localStorage.setItem('car-odometer-values', JSON.stringify(odometerReadings));
    localStorage.setItem('car-odometer-dates', JSON.stringify(dates))
    this.loadStateFromLocalStorage();
  }

  toggle = tab => {
    this.setState({ activeTab: tab });
  }


  render() {
    return (
      <SiteChrome>
        {this.state.needsSetup ? (
          <Setup onComplete={this.onSetupComplete} />
        ) : (
          <Row>
            <Col className='center'>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Odometer
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Odometer History
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Weekly Mileage
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <OdometerDisplay odometerReadings={this.state.odometerReadings} dates={this.state.dates} />
                  <NewOdometerForm odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
                </TabPane>
                <TabPane tabId="2">
                  <OdometerDisplay odometerReadings={this.state.odometerReadings} dates={this.state.dates} />
                  <OdometerHistory odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange}/>
                </TabPane>
                <TabPane tabId="3">
                  <HistoryViz odometerReadings={this.state.odometerReadings} dates={this.state.dates} goal={this.state.goal} />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        )}
      </SiteChrome>
    );
  }
}

export default CarMiles;
