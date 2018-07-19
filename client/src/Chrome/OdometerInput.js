import React, { Component } from 'react';
import { Input } from 'reactstrap'
import './Chrome.css';


class OdometerInput extends Component {
  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onEnterKey();
    }
  }
  render() {
    return (
      <div className={`${this.props.className} input-container`}>
        <i className="fas fa-tachometer-alt fa-2x"></i>
        <Input
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
          type="number"
          name="odometer"
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

export default OdometerInput;
