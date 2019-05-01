import React, { Component } from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import Button from '../Chrome/Button';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import API from '../api/api.js';

// import './CarMiles.css';

const DATE_FORMAT = 'YYYYMMDDTHHmmssZZ';

class VehicleCreate extends Component {
  state = {
    step: 0, // TODO start at 0
    date1: moment().subtract(1, 'months').format(DATE_FORMAT), // STRING
    odometer1: 0,
    date2: moment().format(DATE_FORMAT), // STRING
    odometer2: 100000,
    goal: 13476,

    name: 'Nicks car',
    fuelEconomy: 30,
    manufacturingEmissions: 8950,
    expectedLife: 179000,
  }

  incrementStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  onComplete = () => {
    console.log("oncomplete, campaign", this.props.match.params.campaignId)
    const data = {
      name: this.state.name,
      mpg: this.state.fuelEconomy,
      campaign: this.props.match.params.campaignId,
      carbon_to_manufacture: this.state.manufacturingEmissions,
      expected_life_km: this.state.expectedLife,
      units: 'miles',
    }

    const history1 = {
      date: this.state.date1,
      value: this.state.odometer1,
    };

    const history2 = {
      date: this.state.date2,
      value: this.state.odometer2,
    };

    // Create vehicle, append two history items, redirect the browser
    API.createVehicle(data).then(response => {
      response.json().then(vehicle => {
        API.updateHistory(vehicle.id, history1).then(_ => {
          API.updateHistory(vehicle.id, history2).then(_ => {
            window.location = `/vehicle/${vehicle.id}`;
          })
        })
      })
    })
  }

  renderStep = (step) => {
    switch (step) {
      case 0:
        return ([
          <span>
            This is a tool to help track and understand how much you are using your car.
            Enter your odometer reading each time you fill up your gas tank and watch as the charts evolve over time!
            To get setup, you'll need to know your car's initial and current odometer readings, as well as it's average fuel economy.
            Make sure you have those handy.
          </span>,
          <Button onClick={this.incrementStep} className='top-margin'>Get Started</Button>,
        ]);
      case 1:
        return ([
          <span>
            First, what would you like to call this car? If you share this car with other users of this app, make sure to pick a name they'd recognize.
          </span>,
          <div>
            <Input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              name="car name"
            />
          </div>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 2:
        return ([
          <span>
            Let's come up with an estimate of your car's carbon footprint. First, what's it's fuel economy?
          </span>,
          <div>
            <Input
              value={this.state.fuelEconomy}
              onChange={e => this.setState({ fuelEconomy: e.target.value })}
              type="text"
              name="Fuel Economy"
            />
            <span>MPG (Hardcoded units for now)</span>
          </div>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 3:
        return ([
          <span>
            Now let's come up with a rough estimate of the CO2 emitted during the manufacture of the car. 
            We'll spread this footprint out over the lifetime of the car on a per-mile basis. 
            If you drive the car for half of its lifetime, you're only responsible for half of its manufacturing footprint.
            
            The footprint will vary for each car, so feel free to do your research to find the number that's right for you.
            As a reference, <a href="https://www.ucsusa.org/sites/default/files/attach/2015/11/Cleaner-Cars-from-Cradle-to-Grave-full-report.pdf">The UCSUSA found</a> the footprint of the average US-made gasoline-powered-mid-sized car to be 6750 kg. For a full-sized car it's 8950.
            If the car is electric, add 1000 kg to account for a 24 kWh 84-mile-range battery or 6000 kg for an 85 kWh 265-mile-range battery.
          </span>,
          <div>
            <span>Manufacturing emissions:</span>
            <Input
              value={this.state.manufacturingEmissions}
              onChange={e => this.setState({ manufacturingEmissions: e.target.value })}
              type="text"
              name="Manufacturing Emissions"
            />
            <span>KG CO2</span>
          </div>,
          <div>
            <span>Expected lifetime: </span>
            <Input
              value={this.state.expectedLife}
              onChange={e => this.setState({ expectedLife: e.target.value })}
              type="text"
              name="Expected Life"
            />
            <span>Miles</span>
          </div>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 4:
        return ([
          <span>
            When did you buy your car and what was the approximate odometer reading at the time?
          </span>,
          <DateInput date={this.state.date1} onChange={(date1) => this.setState({ date1 })} className='top-margin' />,
          <OdometerInput value={this.state.odometer1} onChange={(odometer1) => this.setState({ odometer1 })} onEnterKey={this.incrementStep}/>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 5:
        return ([
          <span>
            Go check your odometer now. What does it say?
          </span>,
          <DateInput date={this.state.date2} onChange={(date2) => this.setState({ date2 })} className='top-margin' />,
          <OdometerInput value={this.state.odometer2} onChange={(odometer2) => this.setState({ odometer2 })} onEnterKey={this.incrementStep}/>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 6:
        const deltaMonths = moment(this.state.date2, DATE_FORMAT).diff(moment(this.state.date1, DATE_FORMAT), 'months');
        const deltaTime = deltaMonths < 25 ? `${deltaMonths} months` : `${(deltaMonths / 12).toFixed(0)} years`;
        const milesPerYear = ((this.state.odometer2 - this.state.odometer1) / (deltaMonths / 12)).toFixed(0);
        // Reference Data source: https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
        return ([
          <span>
            Over the past {deltaTime} you drove an average of {milesPerYear} miles/year. The average American drives 13476 miles per year, for reference. As you track your miles, keep an eye on how this number changes!
          </span>,
          <Button onClick={this.onComplete} className='top-margin'>Done</Button>,
        ]);
      default:
        return `Unknown Content for Step ${step}`
    }
  }

  render() {
    return (
      <div className="setup-card">
        {this.renderStep(this.state.step)}
      </div>
    );
  }
}

export default VehicleCreate;
