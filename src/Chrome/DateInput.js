import React, { Component } from 'react';
import { Input } from 'reactstrap'
import './Chrome.css';

class DateInput extends Component {
  render() {
    return (
      <div className={`${this.props.className} input-container`}>
        <i className="fas fa-calendar-alt fa-2x"></i>
        <Input
          value={this.props.date}
          onChange={(e) => this.props.onChange(e.target.value)}
          type="date"
          name="date"
        />
      </div>
    );
  }
}

export default DateInput;
