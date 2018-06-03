import React, { Component } from "react";
import OdometerChart from './OdometerChart';

class OdometerChartWrapper extends Component {
  state = {
    show: false,
  }
  render() {
    return (
    <div>
      <button
        onClick={() =>
          this.setState({ show: !this.state.show })
        }
      >
        Toggle Chart
      </button>
      {this.state.show && (
        <OdometerChart data={this.props.data} />
      )}
    </div>
    );
  }
}

export default OdometerChartWrapper;
