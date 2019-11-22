import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
import Heroes from '../../../src/heroes.json';

class RecentStats extends Component {
    state = {
        wl100: '',
        matches100: '',
        averageMatchNum: '',
        averageKills: '',
        averageDeaths: '',
        averageAssists: '',
        playedHeroes: [],
        mostPlayedHero: '',
        averageParty: '',
    }

    componentDidMount() {
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/wl?limit=100`)
            .then(res => {
                this.setState({
                    wl100: res.data
                })
            })
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=100`)
            .then(res => {
                this.setState({
                    matches100: res.data
                })
                this.averageGameLength()
                this.averageKillsFn()
                this.averageDeathsFn()
                this.averageAssistsFn()
                this.mostPlayedHeroFn()
                this.averagePartyFn()

            })
    }

    averageGameLength(){
        let averageMatch = 0
        for (let i = 0; i <= 99; i++) {
            averageMatch += (this.state.matches100[i].duration / 60)
        }
        averageMatch = (averageMatch / 100).toFixed(2)
        this.setState({
            averageMatchNum: averageMatch
        })
    }

    averageKillsFn() {
        let averageKillsNum = 0
        for (let i = 0; i <= 99; i++) {
            averageKillsNum += this.state.matches100[i].kills / 100
        }
        this.setState({
            averageKills: averageKillsNum.toFixed(1)
        })
    }

    averageDeathsFn() {
        let averageDeathsNum = 0
        for (let i = 0; i <= 99; i++) {
            averageDeathsNum += this.state.matches100[i].deaths / 100
        }
        this.setState({
            averageDeaths: averageDeathsNum.toFixed(1)
        })
    }

    averageAssistsFn() {
        let averageAssistsNum = 0
        for (let i = 0; i <= 99; i++) {
            averageAssistsNum += this.state.matches100[i].assists / 100
        }
        this.setState({
            averageAssists: averageAssistsNum.toFixed(1)
        })
    }

    averagePartyFn() {
        let averagePartyNum = 0
        for (let i = 0; i <= 99; i++) {
            averagePartyNum += this.state.matches100[i].party_size / 100
        }
        this.setState({
            averageParty: averagePartyNum.toFixed(1)
        })
    }

    mostPlayedHeroFn() {
        let playedHeroes = []
        for (let i = 0; i <= 99; i++) {
            playedHeroes.push(this.state.matches100[i].hero_id)
        }
        let highestAmount = 0;
        let mostPlayed = null;
        playedHeroes.reduce((acc, currentVal) => { 
            if (currentVal in acc) {
                acc[currentVal]++;
            } else {
                acc[currentVal] = 1;
            }
    
            if (highestAmount < acc[currentVal]) {
                highestAmount = acc[currentVal];
                mostPlayed = currentVal;
            }
    
            return acc;
        }, {});
        this.setState({
            mostPlayedHero: mostPlayed,
        })
    }

    render() {
        // console.log(this.props)
        const host = 'http://cdn.dota2.com'
        return(
            <div className="recent-stats-container">
                <h2>Last 100 Game Fun Facts</h2>
                <div className="display-column-left">
                    <div className="stat-container-row">
                        <h3>Win Percentage:</h3>
                        <h3>{this.state.wl100.win}%</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Most Played Hero:</h3>
                        {this.state.mostPlayedHero ? (
                            <div className="hero-icon-and-name">
                                <img  className="hero-icon" src={`${host}.${Heroes[this.state.mostPlayedHero].icon}`} alt="hero" />
                                <h3>{Heroes[this.state.mostPlayedHero].localized_name}</h3>
                            </div>
                        ) : null }
                    </div>
                    <div className="stat-container-row">
                        <h3>Average K/D/A:</h3>
                        <h3>{this.state.averageKills} / {this.state.averageDeaths} / {this.state.averageAssists}</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Average Party Size:</h3>
                        <h3>{this.state.averageParty}</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Average Game Length:</h3>
                        <h3>{this.state.averageMatchNum} Minutes</h3> 
                    </div>
                </div>
            </div>
        )
    }
}

export default RecentStats
