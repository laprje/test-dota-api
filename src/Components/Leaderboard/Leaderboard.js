import React, {Component} from 'react';
import './Leaderboard.css';
import axios from 'axios';

class Leaderboard extends Component {
    state = {
        followedUser: []
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                <h1>Leaderboard.js</h1>
            </div>
        )
    }
}

export default Leaderboard