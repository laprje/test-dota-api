import React, {Component} from 'react';
import './Profile.css';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            username: '',
            avatar_url: '',
            location: '',
            team: '',
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        // console.log(this.props)
        return(
            <div className="profile">
            <h1>Profile Page</h1>
                <div className="form">
                    <input
                        placeholder="username" 
                        type="text"
                        onChange={e => this.handleChange('username', e.target.value)}
                        value={this.state.username}
                    />
                    <div className="img-holder">
                        {this.state.avatar_url ? (
                            <img src={this.state.avatar_url} alt="" />
                        ) : 
                            <img src="https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg" alt="" />
                        }
                    </div>
                    <h3>Avatar Url:</h3>
                    <input
                        placeholder="Avatar Url" 
                        type="text"
                        onChange={e => this.handleChange('avatar_url', e.target.value)}
                        value={this.state.avatar_url}
                    />
                    
                    <button>Update</button>
                </div>
            </div>
        )
    }
}