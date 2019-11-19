import React, {Component} from 'react';
import './User.css';
import axios from 'axios';

class RecentStats extends Component {
    state = {
        wl100: '',
        matches100: '',
        averageMatchNum: '',
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
                // console.log(this.state.matches100)
                this.averageGameLength()
                console.log(this.state)
            })
    }

    

    averageGameLength(){
        let averageMatch = 0
        for (let i = 0; i < 99; i++) {
            averageMatch += (this.state.matches100[i].duration / 60)
        }
        averageMatch = (averageMatch / 100).toFixed(2)
        this.setState({
            averageMatchNum: averageMatch
        })
    }

    // averageGameLength(){
    //     let gameLength = this.state.matches100[0].duration
    //     console.log(gameLength / 60)
    // }

    render() {
        // console.log(this.props)
        return(
            <div className="recent-stats-container">
                <h2>Last 100 Games Stats</h2>
                <div className="display-column-left">
                    <div className="stat-container-row">
                        <h3>Win Percentage:</h3>
                        <h3>{this.state.wl100.win}%</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Most Successful Heroes:</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Average K/D/A:</h3>
                    </div>
                    <div className="stat-container-row">
                        <h3>Average GPM:</h3>
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
