import React, {Component} from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';



class Profile extends Component {
    constructor() {
        super()
    
        this.state = {
            user_id: '',
            email: '',
            profile_id: '',
            profile_img: '',
        }
    }

    componentDidMount() {
        this.setState({
            email: this.props.email,
            profile_id: this.props.profile_id,
            profile_img: this.props.profile_img,
            user_id: this.props.user_id,
        })
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }

    handleAvatarChange = (value) => {
        this.setState({
            profile_img: value,
            user_id: this.props.user_id
        })
    }

    updateProfile = () => {
        axios
            .put('/auth/updateProfile', this.state)
            .then(
                this.props.updateUserInfo({
                    profile_img: this.state.profile_img,
                    email: this.state.email, 
                    profile_id: this.state.profile_id,
                })
            )
            .catch(err => console.log(err))
            console.log("profile updated")
    }

    render() {
        // console.log(this.props)
        return(
            <div className="profile">
            <h1>Profile Settings</h1>
            <div className="display-row">
                <div className="form">
                    <div className="display-column">
                        <div className="display-row">
                            <h3>Email:</h3>
                            <input
                                placeholder={this.props.email} 
                                type="text"
                                onChange={e => this.handleChange('email', e.target.value)}
                                value={this.state.email}
                            />
                        </div>
                        <div className="display-row">
                            <h3>ID:</h3>
                            <input
                                placeholder={this.props.profile_id} 
                                type="text"
                                onChange={e => this.handleChange('profile_id', e.target.value)}
                                value={this.state.profile_id}
                            />
                        </div>
                    </div>
                    <h3>Choose an avatar for your profile</h3>
                    <div className="avatar-container">                    
                        <img
                            onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/2/25/Ancient_Apparition_minimap_icon.png?version=e3becf8cdf1503d69b7df8d34b6ccfe3')} 
                            className="avatar-icon" 
                            src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/25/Ancient_Apparition_minimap_icon.png?version=e3becf8cdf1503d69b7df8d34b6ccfe3' 
                            alt="" 
                        />
                        <img 
                            onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/5/55/Pudge_minimap_icon.png?version=e9f2d6945ca53b69e16dc7f51d691359')} 
                            className="avatar-icon" 
                            src='https://gamepedia.cursecdn.com/dota2_gamepedia/5/55/Pudge_minimap_icon.png?version=e9f2d6945ca53b69e16dc7f51d691359' 
                            alt="" 
                        />
                        <img
                            onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0')} 
                            className="avatar-icon" 
                            src='https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0' 
                            alt="" 
                        />
                        <img 
                            onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/2/21/Phoenix_minimap_icon.png?version=740203b2905840eee8fda6b8d6a6d6e0')} 
                            className="avatar-icon" 
                            src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/21/Phoenix_minimap_icon.png?version=740203b2905840eee8fda6b8d6a6d6e0' 
                            alt="Phoenix avatar" 
                        />
                        <img
                            onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/9/9c/Bounty_Hunter_minimap_icon.png?version=4914405e8ba19df2e6b193ae378db02c')} 
                            className="avatar-icon" 
                            src='https://gamepedia.cursecdn.com/dota2_gamepedia/9/9c/Bounty_Hunter_minimap_icon.png?version=4914405e8ba19df2e6b193ae378db02c' 
                            alt="" 
                        />
                    </div>
                    
                    <button onClick={this.updateProfile}>Update</button>
                </div>
                <div className="subscribe-container">
                    <h3>Plus Subscription</h3>
                    <p>$5/month</p>
                    <p>Become a user and gain access to more features!</p>
                    <p>Learn more(link)</p>
                    <button>Subscribe</button>
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}
const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)