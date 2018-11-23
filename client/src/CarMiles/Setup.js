import React, { Component } from "react";
import moment from 'moment';
import Button from '../Chrome/Button';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import './CarMiles.css';

const DATE_FORMAT = 'YYYYMMDDTHHmmssZZ';

class Setup extends Component {
  state = {
    step: 0, // TODO start at 0
    date1: moment().subtract(1, 'months').format(DATE_FORMAT), // STRING
    odometer1: 0,
    date2: moment().format(DATE_FORMAT), // STRING
    odometer2: 100000,
    goal: 13476,
  }

  incrementStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  onComplete = () => {
    let { date1, odometer1, date2, odometer2, goal } = this.state;
    odometer1 = Number(odometer1);
    odometer2 = Number(odometer2);
    goal = Number(goal)
    this.props.onComplete({ date1, odometer1, date2, odometer2, goal });
  }

  renderStep = (step) => {
    switch (step) {
      case 0:
        return ([
          <span>
            This is a tool to help track and understand how much you are using your car. Enter your odometer reading each time you fill up your gas tank and watch as the charts evolve over time!
          </span>,
          <Button onClick={this.incrementStep} className='top-margin'>Get Started</Button>,
        ]);
      case 1:
        return ([
          <span>
            When did you buy your car and what was the approximate odometer reading at the time?
          </span>,
          <DateInput date={this.state.date1} onChange={(date1) => this.setState({ date1 })} className='top-margin' />,
          <OdometerInput value={this.state.odometer1} onChange={(odometer1) => this.setState({ odometer1 })} onEnterKey={this.incrementStep}/>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 2:
        return ([
          <span>
            Go check your odometer now. What does it say?
          </span>,
          <DateInput date={this.state.date2} onChange={(date2) => this.setState({ date2 })} className='top-margin' />,
          <OdometerInput value={this.state.odometer2} onChange={(odometer2) => this.setState({ odometer2 })} onEnterKey={this.incrementStep}/>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 3:
        const deltaMonths = moment(this.state.date2, DATE_FORMAT).diff(moment(this.state.date1, DATE_FORMAT), 'months');
        const deltaTime = deltaMonths < 25 ? `${deltaMonths} months` : `${(deltaMonths / 12).toFixed(0)} years`;
        const milesPerYear = ((this.state.odometer2 - this.state.odometer1) / (deltaMonths / 12)).toFixed(0);
        // Reference Data source: https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
        return ([
          <span>
            In the past {deltaTime} you drove an average of {milesPerYear} miles/year. The average American drives 13476 miles per year, for reference. Do you think you can do better? How many miles do you want to drive in the next year?
          </span>,
          <OdometerInput value={this.state.goal} onChange={(goal) => this.setState({ goal })} className='top-margin' onEnterKey={this.incrementStep}/>,
          <Button onClick={this.incrementStep} className='top-margin'>Next</Button>,
        ]);
      case 4:
        return ([
          <span>
            Great! To meet your goal, try not to drive more than {(this.state.goal / 52).toFixed(0)} miles per week. Keep checking back here whenever you fill up to track progress towards your goal.
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

export default Setup;
