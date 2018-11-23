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
    vehicles: undefined,
  }

  componentWillMount() {
    const username = localStorage.getItem('username');
    const campaign = localStorage.getItem('campaign');
    if (!username || !campaign) {
      window.location = '/login';
    } else {
      API.getCampaign(campaign).then(this.onCampaignLoad).catch(console.error)
    }
  }

  onCampaignLoad = (response) => {
    if (response.status == 200) {
      response.json().then(campaign => {
        this.setState({ vehicles: campaign.vehicles }); // Might be empty
        if (campaign.vehicles.length > 0) {
          API.getVehicle(campaign.vehicles[0].id).then(this.onVehicleLoad).catch(console.error)
        }
      })
    } else {
      alert('Error Loading Data');
      console.error(response);
    }
  }

  onVehicleLoad = (response) => {
    console.log("onVehicleLoad", response)
    if (response.status <= 201) {
      response.json().then(vehicle => {
        const dates = vehicle.history.map(({ date }) => date);
        const odometerReadings = vehicle.history.map(({ value }) => value);
        const needsSetup = odometerReadings.length < 2
        this.setState({ dates, odometerReadings, needsSetup });
      })
    } else {
      alert('Error Loading Vehicle Data');
      console.error(response);
    }
  }

  onSetupComplete = (data) => {
    const dates = [data.date1, data.date2];
    const odometerReadings = [data.odometer1, data.odometer2];
    this.onHistoryChange(odometerReadings, dates)
  }

  onHistoryChange = (odometerReadings, dates) => {
    const vehicleId = this.state.vehicles[0].id
    Promise.all(odometerReadings.map(
      (value, i) => {
        const data = { value, date: dates[i] }
        return API.updateHistory(vehicleId, data).then(this.onVehicleLoad).catch(console.error);
      }
    )).then(() => this.setState({ needsSetup: false }));
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
