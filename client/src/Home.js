import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import SiteChrome from './Chrome/SiteChrome';
import API from './api/api.js';
import './App.css';

const ICON_SIZE = 'fa-9x';

class Home extends Component {
  componentWillMount() {
    // If user specified in localstorage, redirect to campaign page.
    const username = localStorage.getItem('username')
    if (username) {
      API.getUser(username).then(response => {
        response.json().then(user => {
          console.log("Loaded user: ", user);
          if (user.campaigns.length > 0) {
            // Assume default campaign is listed first
            const campaignId = user.campaigns[0].id;
            window.location = `/campaign/${campaignId}`;
          }
          
        })
      })
    }
  }

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
              <Link to="/carmiles"><i className={`fas fa-car ${ICON_SIZE}`}></i></Link>
            </Col>
            <Col>
              <Link to="#"><i className={`fas fa-bolt ${ICON_SIZE}`}></i></Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="#"><i className={`fas fa-recycle ${ICON_SIZE}`}></i></Link>
            </Col>
            <Col>
              <Link to="#"><i className={`fas fa-utensils ${ICON_SIZE}`}></i></Link>
            </Col>
          </Row>
        </Row>
        <Row className="home-row alt-background">
          <h3>Your Personal Environmetal Health Portfolio</h3>
          <h5>Please <Link to="/login">login or create an account</Link> to get started</h5>
        </Row>
        <Row className="home-row">
          <h3>More Resources</h3>
          <ul style={{ textAlign: 'left' }}>
            <li><a href="https://chooose.today/" target="_blank" rel="noopener noreferrer">Chooose.today:</a> A Norwegian initiative to buy up emissions quotas so that big polluters can't</li>
            <li><a href="https://www.terrapass.com" target="_blank" rel="noopener noreferrer">TerraPass:</a> A San Francisco-based company that lets you fund projects that reduce CO2 emissions</li>
            <li><a href="https://thegoodtraveler.org" target="_blank" rel="noopener noreferrer">The Good Traveler:</a> A San Diego-based company that lets you fund projects that reduce CO2 emissions</li>
            <li><a href="https://carbonfund.org/" target="_blank" rel="noopener noreferrer">Carbon Fund</a></li>
            <li><a href="https://www.carbonfootprint.com/" target="_blank" rel="noopener noreferrer">CarbonFootprint.com</a></li>
            <li><a href="https://www.nature.org/greenliving/carboncalculator/" target="_blank" rel="noopener noreferrer">The Nature Conservency Carbon Footprint Calculator</a></li>
            <li><a href="https://www3.epa.gov/carbon-footprint-calculator/" target="_blank" rel="noopener noreferrer">US Environmental Protection Agency Carbon Footprint Calculator</a></li>
            <li><a href="https://www.conservation.org/act/carboncalculator/calculate-your-carbon-footprint.aspx#/" target="_blank" rel="noopener noreferrer">Conservation International Carbon Footprint Calculator</a></li>
            <li><a href="https://www.oroeco.com" target="_blank" rel="noopener noreferrer">OroEco:</a> An app that helps you track your carbon footprint. I've seen several cases of it not functioning correctly, however.</li>
          </ul>
        </Row>
      </SiteChrome>
    );
  }
}

export default Home;
