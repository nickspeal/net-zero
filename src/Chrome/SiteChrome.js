import React, { Component } from "react";
import { Container } from 'reactstrap';

class SiteChrome extends Component {
  render() {
    return (
      <Container fluid>
        {this.props.children}
      </Container>
    );
  }
}

export default SiteChrome;
