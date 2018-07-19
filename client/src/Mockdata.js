import React, { Component } from 'react';
import data from './mockdata.json';

class Mockdata extends Component {
  componentWillMount() {
    Object.keys(data).forEach(key => {
      console.log(`Setting key: ${key} value: ${JSON.stringify(data[key])}`);
      localStorage.setItem(key, JSON.stringify(data[key]));
    });
  }

  render() {
    return null;
  }
}

export default Mockdata;
