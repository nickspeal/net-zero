import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
import SiteChrome from '../Chrome/SiteChrome';
import API from '../api/api.js';
// import './App.css';

// campaign id {this.props.match.params.campaignId}

class Campaign extends Component {
    state = {
        campaign: {
            id: undefined,
            name: undefined,
            offsets_available: 0,
            users: [],
            vehicles: [],
        }
    }
    componentWillMount() {
        const id = this.props.match.params.campaignId;
        if (id) {
            API.getCampaign(id).then(response => {
                response.json().then(campaign => {
                    console.log(campaign);
                    this.setState({ campaign })
                })
            })
        }
    }
    render() {
    return (
      <SiteChrome>
          <h2>{this.state.campaign.name}</h2>
          <h3>Offsets Available: {this.state.campaign.offsets_available}</h3>
          <h3>Participants</h3>
          <ul>
              {this.state.campaign.users.map(username => <li>{username}</li>)}
          </ul>
          <br />
          <h3>Vehicles</h3>
          <ul>
            {this.state.campaign.vehicles.map(vehicle => <li><Link to={`/vehicle/${vehicle.id}`}>{vehicle.name}</Link></li>)}
            <li><Link to={`/campaign/${this.props.match.params.campaignId}/addvehicle`}>Add New Vehicle</Link></li>
            <li>Add existing Vehicle</li>
          </ul>
      </SiteChrome>
    );
  }
}

export default Campaign;
