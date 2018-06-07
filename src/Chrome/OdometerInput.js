import React, { Component } from 'react';
import { Input } from 'reactstrap'
import './Chrome.css';


class OdometerInput extends Component {
  render() {
    return (
      <div className={`${this.props.className} input-container`}>
        <i className="fas fa-tachometer-alt fa-2x"></i>
        <Input
          value={this.props.value}
          onChange={(e) => this.props.onChange(Number(e.target.value))}
          type="number"
          name="odometer"
        />
      </div>
    );
  }
}

export default OdometerInput;
