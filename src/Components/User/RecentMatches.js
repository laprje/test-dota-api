import React, {Component} from 'react';
import './User.css';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import Heroes from '../../../src/heroes.json';



export default class RecentMatches extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userWin: '',
            matchDateSingle: '',
            matchDate: '',

        }
    }

    componentDidMount() {
        this.epochToDate()
        this.didUserWin()
    }

    async epochToDate() {
        // let months = [ "January", "February", "March", "April", "May", "June", 
        // "July", "August", "September", "October", "November", "December" ]
        let newDate = new Date((this.props.matchObj.start_time) * 1000)
        let newDateStr = JSON.stringify(newDate)
        let newDateStrSimple = newDateStr.substring(6, 11)
        await this.setState({
            matchDate: newDateStrSimple
        })
        
    }


    didUserWin() {
        if (this.props.matchObj.player_slot > 99 && this.props.matchObj.radiant_win === false) {
            this.setState({
                userWin: 'Won',
            })
        } else if (this.props.matchObj.player_slot > 99 && this.props.matchObj.radiant_win === true) {
            this.setState({
                userWin: 'Lost',
            })

        } else if (this.props.matchObj.player_slot < 99 && this.props.matchObj.radiant_win === true) {
            this.setState({
                userWin: 'Won',
            })

        } else if (this.props.matchObj.player_slot < 99 && this.props.matchObj.radiant_win === false) {
            this.setState({
                userWin: 'Lost',
            })
        }
    }

    render() {     
        // console.log(this.props.matchDate)
        const host = 'http://cdn.dota2.com'
        return (
                <Link className="recent-match-row link" to={`/match/${this.props.matchObj.match_id}`}>
                    <div className="hero-img-name">
                        <img className="hero-icon" src={`${host}.${Heroes[this.props.matchObj.hero_id].img}`} alt="hero" />
                        <h2 className="hero-name">{Heroes[this.props.matchObj.hero_id].localized_name}</h2>
                    </div>
                    <div className="recent-match-stats-row">
                        {this.state.userWin ? (
                        <h2 className={this.state.userWin}>{this.state.userWin}</h2>
                        ) : null }
                        <h2>{`${this.state.matchDate}`}</h2>
                        <h2>{(this.props.matchObj.duration / 60).toFixed(0)} Min</h2>
                        <h2 className="kda">{this.props.matchObj.kills}/{this.props.matchObj.deaths}/{this.props.matchObj.assists}</h2>
                    </div>
                </Link>
        )
    }
}