import React, {Component} from 'react';
import './User.css';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
import Heroes from '../../../src/heroes.json';






export default class RecentMatches extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {      
        // console.log(this.props)
        const host = 'http://cdn.dota2.com'
        return (
            <div className="recent-match-row">
                <img  className="hero-icon" src={`${host}.${Heroes[this.props.matchObj.hero_id].icon}`} alt="hero" />
                <h2>{(this.props.matchObj.duration / 60).toFixed(0)} Min</h2>
                <h2>{this.props.matchObj.kills} / {this.props.matchObj.deaths} / {this.props.matchObj.assists}</h2>
            </div>
        )
    }
}