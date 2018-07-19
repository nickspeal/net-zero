import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "bar"
  },
  title: {
    text: ""
  },
  yAxis: {
    title: {
      text: "miles"
    }
  },
  xAxis: {
    visible: true
  },
  plotOptions: {
    column: {
      dataLabels: {
        format: function () {return this.x},
        inside: true,
      }
    }
  },
};
function transformedData(current, goal) {
  let data = [
    { name: "Goal", data: [goal], color: "#29B6F6" },
    {
      name: "Miles Traveled",
      data: [current],
      color: current < goal ? "#66BB6A" : "#FF7043"
    }
  ];
  return { ...options, series: data };
}

export default class ProgressChart extends Component {
  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={transformedData(this.props.current, this.props.goal)}
        />
      </div>
    );
  }
}
