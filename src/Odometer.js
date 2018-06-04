import React, { Component } from "react";

class Odometer extends Component {
  //Props
  // data {miles, date}

  render() {
    if (!this.props.data) {
      return <div>No Odometer Reading</div>;
    }
    return(
      <div>
        Last Odometer Reading: {this.props.data.miles} miles on {this.props.data.date}
      </div>
    );
  }
}

export default Odometer;
