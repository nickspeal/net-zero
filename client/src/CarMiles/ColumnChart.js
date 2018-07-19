import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ColumnChart extends Component {
  render() {
    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: this.props.title
      },
      xAxis: {
        categories: this.props.bucketNames,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Miles'
        },
        plotLines: [{
          color: '#FF0000',
          value: this.props.plotLine,
          width: 2
        }]
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [{
        name: "Miles Travelled",
        data: this.props.bucketValues,
      }]
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  }
}

export default ColumnChart
