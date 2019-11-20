import React, {Component} from 'react';
import './Match.css';
import Player from './Player';
import axios from 'axios';

export default class Match extends Component {
    constructor(){
        super()

        this.state = {
            matchData: '',
        }
    }

    componentDidMount() {
        axios
            .get(`https://api.opendota.com/api/matches/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    matchData: res.data
                })
                console.log(this.state)
            })
    }

    render() {
        // console.log(this.props)
        let key = 0;
        return(
            <div className="match">
                {this.state.matchData.radiant_win ? (
                <h1>Radiant Win</h1>
                ) : 
                <h1>Dire Win</h1>
                }
                <div className="display-row">
                    <div className="display-row-start">
                        <h3>Hero</h3>
                        <h3>Player Name</h3>
                    </div>
                    <div className="display-row-end">
                        <h3>Team</h3>
                        <h3>GPM</h3>
                        <h3>APM</h3>
                    </div>
                </div>
                {this.state.matchData.players ? (
                <div className="match-container">
                    <div className="recent-matches">{this.state.matchData.players.map(el => (
                        <Player 
                        playerObj={el} key={key++}
                        />
                    ))}
                    </div>
                </div>
                ) : null }
            </div>
        )
    }
}