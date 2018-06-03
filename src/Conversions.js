import React, { Component } from 'react';
import './App.css';

// Equivalents per mile
const EQUIVALENTS = {
  'co2': 1690 / 2000,
  'trees': 20 / 2000,
  'dollars': 8.43 / 2000,
}

class Conversions extends Component {
  // Props:
  // miles
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Number of Miles Traveled</td>
            <td>{this.props.miles.toFixed(0)}</td>
          </tr>
          <tr>
            <td>CO2 emitted</td>
            <td>{(this.props.miles * EQUIVALENTS['co2']).toFixed(1)} lbs</td>
          </tr>
          <tr>
            <td>Trees Required To Offset</td>
            <td>{(this.props.miles * EQUIVALENTS['trees']).toFixed(0)}</td>
          </tr>
          <tr>
            <td>Dollars Required To Offset</td>
            <td>${(this.props.miles * EQUIVALENTS['dollars']).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Offset Now!</td>
            <td><a href="http://www.terrapass.com/product-category/individuals">Do it!</a></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Conversions;
