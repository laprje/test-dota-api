import React, {Component} from 'react';
import './Leaderboard.css';
// import axios from 'axios';
import User from '../User/User';

class Leaderboard extends Component {
    constructor() {
        super()
    
    this.state = {
        followedUsers: [],
    }
}

    // componentDidMount() {
    //     axios
    //     .get('/api/users/leaderboard')
    //     .then(res => {
    //         this.setState({
    //             followedUsers: res.data
    //         })
    //     })
    // }

    render() {
        let key = 0;
        return(
            <div>
                <h1>Leaderboard.js</h1>

                {this.state.followedUsers ? (
                    <div className="dashboard-cont">
                        {this.state.followedUsers.map(el => (
                            <User 
                            userObj={el} key={key++}
                            />
                        ))}
                    </div>
                    ) : null }
            </div>
        )
    }
}

export default Leaderboard