import React, {Component} from 'react';
import './User.css';
// import axios from 'axios';
// import {Link} from 'react-router-dom';





export default class RecentMatches extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {      
        // console.log(this.props)

        return (
            <div className="recent-match-row">
                <h2>{this.props.matchObj.match_id}</h2>
                <h2>{this.props.matchObj.kills} / {this.props.matchObj.deaths} / {this.props.matchObj.assists}</h2>
            </div>
        )
    }
}