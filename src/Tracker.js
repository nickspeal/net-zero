import React, { Component } from "react";
import MileageInput from "./MileageInput";
import OdometerChart from "./OdometerChart";
import ProgressChart from "./ProgressChart";
import moment from "moment";

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    let data = JSON.parse(localStorage.getItem("impact"));
    console.log("data", data);
    this.setState({ data });
  };

  updateTransportation = data => {
    console.log("data", data);
    let joined = this.state.data.running.transportation.concat(data);
    this.setState({ data: { running: { transportation: joined } } });
    // TODO: Update localStorage
  };

  render() {
    return (
      <div>
        <ProgressChart current={700} goal={1000} />
        <MileageInput updateTransportation={this.updateTransportation} />
        {this.state.data && (
          <OdometerChart data={this.state.data.running.transportation} />
        )}
      </div>
    );
  }
}
