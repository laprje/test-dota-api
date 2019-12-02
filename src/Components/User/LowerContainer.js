import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
import RecentMatches from './RecentMatches';






export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recentMatches: '',
            numHolder: 0,
        }
    }

    componentDidMount() {
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=10&offset=${this.state.numHolder}`)
            .then(res => {
                this.setState({
                    recentMatches: res.data
                })

            })
    }

    
    

    nextButton = async () => {
        await this.setState({
            numHolder: this.state.numHolder + 10
        })
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=10&offset=${this.state.numHolder}`)
            .then(res => {
                this.setState({
                    recentMatches: res.data
                })
            })
    }
    
    previousButton = async () => {
        if (this.state.numHolder > 0) {
        await this.setState({
            numHolder: this.state.numHolder - 10
        })
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=10&offset=${this.state.numHolder}`)
            .then(res => {
                this.setState({
                    recentMatches: res.data
                })
            })
        } else {
            console.log("no previous matches")
        }
    }
    
    
    
    render() {
        let key = 0;
        // console.log(this.state)
        return (
            <div className="lower-container-recent-matches">
                {this.state.recentMatches ? (
                    <div className="lower-cont">
                        <h1>Recent Matches</h1>
                        <div className="display-row">
                            <h3>HERO</h3>
                            <div className="display-row-3">
                                <h3>RESULT</h3>
                                <h3>DATE</h3>
                                <h3>LENGTH</h3>
                                <h3>KDA</h3>
                            </div>
                        </div>
                            <div className="recent-matches">
                                {this.state.recentMatches.map(el => (
                                    <RecentMatches 
                                    matchObj={el} key={key++}
                                    />
                                ))}
                            </div>

                    </div>
                    ) : null }
                <div className="display-row">
                    <button onClick={this.previousButton}>Previous 10</button>
                    <button onClick={this.nextButton}>Next 10</button>
                </div>
            </div>
        )
    }
}