import React, { Component } from 'react';
import { Input } from 'reactstrap'


class DateInput extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <i className="fas fa-calendar-plus fa-2x"></i>
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
