import React, {Component} from 'react';
import './Profile.css';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            username: '',
            email: '',
            avatar_url: '',
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
            <h1>Profile Settings</h1>
                <div className="form">
                    <input
                        placeholder="Username" 
                        type="text"
                        onChange={e => this.handleChange('username', e.target.value)}
                        value={this.state.username}
                    />
                    <input
                        placeholder="Email (Optional)" 
                        type="text"
                        onChange={e => this.handleChange('email', e.target.value)}
                        value={this.state.email}
                    />
                    <h3>Choose an Avatar for your profile</h3>
                    <div className="avatar-container">                    
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/25/Ancient_Apparition_minimap_icon.png?version=e3becf8cdf1503d69b7df8d34b6ccfe3' alt="" />
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/5/55/Pudge_minimap_icon.png?version=e9f2d6945ca53b69e16dc7f51d691359' alt="" />
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0' alt="" />
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/21/Phoenix_minimap_icon.png?version=740203b2905840eee8fda6b8d6a6d6e0' alt="" />
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/9/9c/Bounty_Hunter_minimap_icon.png?version=4914405e8ba19df2e6b193ae378db02c' alt="" />
                    </div>
                    
                    <button>Update</button>
                </div>
            </div>
        )
    }
}