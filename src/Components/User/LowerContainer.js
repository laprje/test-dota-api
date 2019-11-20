import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
import RecentMatches from './RecentMatches';





export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recentMatches: '',
            recentWL: '',
        }
    }

    componentDidMount() {
        axios
            .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=20`)
            .then(res => {
                this.setState({
                    recentMatches: res.data
                })
                console.log(this.state.recentMatches)
            })
        // axios
        // .get(`https://api.opendota.com/api/players/${this.props.userId}/matches?limit=20&offset=20`)
        // .then(res => {
        //     this.setState({
        //         recentWL: res.data
        //     })
        //     console.log(this.state.recentWL)
        // })
    }
    
    twentyRecent() {
    }
    
    render() {
        let key = 0;
        // console.log(this.state.recentMatches)
        return (
            <div className="lower-container-recent-matches">
                {this.state.recentMatches ? (
                    <div className="lower-cont">
                        <h1>Recent Matches</h1>
                        <div className="display-row">
                            <h3>HERO</h3>
                            <h3>GAME LENGTH</h3>
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