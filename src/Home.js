import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import SiteChrome from './Chrome/SiteChrome';
import './App.css';

const ICON_SIZE = 'fa-9x';

class Home extends Component {
  render() {
    return (
      <SiteChrome>
        <Row className="home-row">
          <h3>Track your Actions as you make progress towards a carbon-neutral lifestyle</h3>
        </Row>
        <Row className="home-row alt-background">
          <p>
            There's still plenty of healthy debate about exactly how fast climate change will occur and what lasting impacts it will have on societies and ecosystems, but the vast majority of academically credible scientists (including every scientific body of national or international standing, the IPCC, and the National Academy of Sciences) caution that we must rapidly act to stabilize climate or risk a host of negative consequences, including droughts, fires, floods, extreme weather, heat waves, crop failures, famines, disease, melting glaciers and ice caps, rising sea levels, loss of sea ice, ocean acidification, invasive species, loss of habitat, massive economic losses, refugees, armed conflict over resources, and potentially over a hundred of million people dead along with the extinction of over half of Earth's species. <a href="https://www.oroeco.com/faq#4">(source)</a>
          </p>
        </Row>
        <Row className="home-row">
          <h3>Track your lifestyle</h3>
          <Row>
            <Col style={{ position: 'relative' }}>
              <span className="annotation">Click Here!</span>
              <Link to="/carmiles"><i class={`fas fa-car ${ICON_SIZE}`}></i></Link>
            </Col>
            <Col>
              <Link to="#"><i class={`fas fa-bolt ${ICON_SIZE}`}></i></Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="#"><i class={`fas fa-recycle ${ICON_SIZE}`}></i></Link>
            </Col>
            <Col>
              <Link to="#"><i class={`fas fa-utensils ${ICON_SIZE}`}></i></Link>
            </Col>
          </Row>
        </Row>
        <Row className="home-row alt-background">
          <h3>Your Personal Environmetal Health Portfolio</h3>
          <h5>Coming Soon: Measure your carbon footprint!</h5>
        </Row>
        <Row className="home-row">
          <h3>More Resources</h3>
          <ul>
            <li>Terrapass</li>
            <li>OroEco</li>
            <li>TheGoodTraveler.org</li>
            <li>carbonfund</li>
            <li>More...</li>
            <li>More...</li>
            <li>More...</li>
            <li>More...</li>
            <li>More...</li>
          </ul>
        </Row>
      </SiteChrome>
    );
  }
}

export default Home;
