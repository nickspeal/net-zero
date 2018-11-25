import React, { Component } from 'react';
import { Input } from 'reactstrap'
import moment from 'moment';
import './Chrome.css';

const DATE_INPUT_FORMAT = 'YYYY-MM-DD';  // Supported by Input component
const DATE_STORAGE_FORMAT = 'YYYYMMDDTHHmmssZZ';  // ISO 8061

class DateInput extends Component {
  
  onDateChange = (event) => {
    const newDate = event.target.value
    const formattedDate = moment(newDate, DATE_INPUT_FORMAT).format(DATE_STORAGE_FORMAT);
    this.props.onChange(formattedDate);
  }


  render() {
    const value = moment(this.props.date, DATE_STORAGE_FORMAT).format(DATE_INPUT_FORMAT);

    return (
      <div className={`${this.props.className} input-container`}>
        <i className="fas fa-calendar-alt fa-2x"></i>
        <Input
          value={value}
          onChange={this.onDateChange}
          type="date"
          name="date"
        />
      </div>
    );
  }
}

export default DateInput;
