import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CardGroup } from "reactstrap";
const options = {
  title: {
    text: "Your mileage"
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      month: "%e. %b",
      year: "%b"
    },
    title: {
      text: "Date"
    }
  }
};
function transformedData(data) {
  if (data) {
    let arrayData = data.map(d => {
      let da = d.date.split("-");
      let newDate = Date.UTC(da[2], da[0]-1, da[1]); // Bizarre month convention
      return [newDate, d.miles];
    });
    return { ...options, series: [{ name: "mileage", data: arrayData }] };
  } else return null;
}

export default class OdometerChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: transformedData(this.props.data) };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={transformedData(this.props.data)}
        />
      </div>
    );
  }
}
