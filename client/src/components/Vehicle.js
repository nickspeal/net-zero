import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import classnames from 'classnames';
import SiteChrome from '../Chrome/SiteChrome';
import API from '../api/api.js';
import OdometerDisplay from '../CarMiles/OdometerDisplay';
import NewOdometerForm from '../CarMiles/NewOdometerForm';
import OdometerHistory from '../CarMiles/OdometerHistory';
import HistoryViz from '../CarMiles/HistoryViz';

// import './App.css';

class Vehicle extends Component {
    state = {
        vehicle: {
            id: undefined,
            name: undefined,
            notes: undefined,
            units: 'km',
            campaigns: [],
            history: [],
            carbon_to_manufacuture: undefined,
            expected_life_km: undefined,
            fuel_l_per_100km: undefined,
            carbon_per_unut: undefined,
        },
        odometerReadings: [],
        dates: [],
        activeTab: '1',
    }
    componentWillMount() {
        const id = this.props.match.params.vehicleId;
        if (id) {
          API.getVehicle(id).then(this.onVehicleLoad)
        }
    }

    onVehicleLoad = (response) => {
      response.json().then(vehicle => {
        console.log(vehicle);
        this.setState({ vehicle })

        // Convert history into the parallel arrays datascructure that children expect:
        const dates = vehicle.history.map(({ date }) => date);
        const odometerReadings = vehicle.history.map(({ value }) => value);
        this.setState({ dates, odometerReadings, });
      });
    }
  
    onHistoryChange = (odometerReadings, dates) => {
      const vehicleId = this.state.vehicle.id
      Promise.all(odometerReadings.map(
        (value, i) => {
          const data = { value, date: dates[i] }
          return API.updateHistory(vehicleId, data).then(this.onVehicleLoad).catch(console.error);
        }
      ));
    }

    toggle = tab => {
      this.setState({ activeTab: tab });
    }

    render() {
    return (
      <SiteChrome>
        <h2>{this.state.vehicle.name}</h2>
        {this.state.vehicle.fuel_l_per_100km && <h4>Fuel Economy: {this.state.vehicle.fuel_l_per_100km.toFixed(1)} L/100 km</h4>}
        <p>{this.state.vehicle.notes}</p>

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
                <NewOdometerForm odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange} />
              </TabPane>
              <TabPane tabId="2">
                <OdometerDisplay odometerReadings={this.state.odometerReadings} dates={this.state.dates} />
                <OdometerHistory odometerReadings={this.state.odometerReadings} dates={this.state.dates} onChange={this.onHistoryChange} />
              </TabPane>
              <TabPane tabId="3">
                <HistoryViz odometerReadings={this.state.odometerReadings} dates={this.state.dates} goal={this.state.goal} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </SiteChrome>
    );
  }
}

export default Vehicle;
