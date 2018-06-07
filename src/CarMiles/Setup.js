import React, { Component } from "react";
import moment from 'moment';
import Button from '../Chrome/Button';
import DateInput from '../Chrome/DateInput';
import OdometerInput from '../Chrome/OdometerInput';
import './CarMiles.css';


class Setup extends Component {
  state = {
    step: 0, // TODO start at 0
    date1: moment().subtract(1, 'months').format("YYYY-MM-DD"), // STRING
    odometer1: 0,
    date2: moment().format("YYYY-MM-DD"), // STRING
    odometer2: 100000,
    goal: 10000,
  }

  incrementStep = () => {
    this.setState({ step: this.state.step + 1 });
  }

  onComplete = () => {
    const { date1, odometer1, date2, odometer2, goal } = this.state;
    this.props.onComplete({ date1, odometer1, date2, odometer2, goal });
  }

  renderStep = (step) => {
    switch (step) {
      case 0:
        return ([
          <span>
            This is a tool to help track and understand how much you are using your car. Enter your odometer reading each time you fill up your gas tank and watch as the charts evolve over time!
          </span>,
          <Button onClick={this.incrementStep}>Get Started</Button>,
        ]);
      case 1:
        return ([
          <span>
            When did you buy your car and what was the approximate odometer reading at the time?
          </span>,
          <DateInput date={this.state.date1} onChange={(date1) => this.setState({ date1 })} />,
          <OdometerInput value={this.state.odometer1} onChange={(odometer1) => this.setState({ odometer1 })} />,
          <Button onClick={this.incrementStep}>Next</Button>,
        ]);
      case 2:
        return ([
          <span>
            Go check your odometer now. What does it say?
          </span>,
          <DateInput date={this.state.date2} onChange={(date2) => this.setState({ date2 })} />,
          <OdometerInput value={this.state.odometer2} onChange={(odometer2) => this.setState({ odometer2 })} />,
          <Button onClick={this.incrementStep}>Next</Button>,
        ]);
      case 3:
        return ([
          <span>
            In the past X years you drove an average of Y miles/year. The average American drives Z miles per year, for reference. Do you think you can do better? How many miles do you want to drive in the next year?
          </span>,
          <OdometerInput value={this.state.goal} onChange={(goal) => this.setState({ goal })} />,
          <Button onClick={this.incrementStep}>Next</Button>,
        ]);
      case 4:
        return ([
          <span>
            Great! That means you shuld try not to drive more than {(this.state.goal / 52).toFixed(0)} miles per week. Keep checking back here whenever you fill up to track progress towards your goal.
          </span>,
          <Button onClick={this.onComplete}>Done</Button>,
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
