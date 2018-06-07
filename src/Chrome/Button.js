import React, { Component } from "react";
import './Chrome.css'

class Button extends Component {
  render() {
    return (
      <button {...this.props} className={`${this.props.className} button`}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
