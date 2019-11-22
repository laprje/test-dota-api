import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
import RecentMatches from './RecentMatches';






export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recentMatches: '',
        }
    }

    componentDidMount() {
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=20`)
            .then(res => {
                this.setState({
                    recentMatches: res.data
                })
            })
    }
    
    
    
    
    render() {
        let key = 0;
        return (
            <div className="lower-container-recent-matches">
                {this.state.recentMatches ? (
                    <div className="lower-cont">
                        <h1>Recent Matches</h1>
                        <div className="display-row">
                            <h3>HERO</h3>
                            <h3>RESULT</h3>
                            <h3>LENGTH</h3>
                            <h3>KDA</h3>
                        </div>
                            <div className="recent-matches">{this.state.recentMatches.map(el => (
                                    <RecentMatches 
                                    matchObj={el} key={key++}
                                    />
                                ))}
                            </div>

                    </div>
                    ) : null }
                <div className="display-row">
                    <button>Previous 20</button>
                    <button>Next 20</button>
                </div>
            </div>
        )
    }
}