import React, { Component } from 'react';
import { Input } from 'reactstrap'


class OdometerInput extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
