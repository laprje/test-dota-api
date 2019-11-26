import React, {Component} from 'react';
import './User.css';

export default class FollowedUser extends Component {
    constructor() {
        super() 

        this.state = {

        }
    }

    render() {
        console.log(this.props)
        return(
            <div className="followee-cont">
                <h3>{this.props.followedUserObj.profile.personaname}</h3>
                <img className="profile-img-followee" src={this.props.followedUserObj.profile.avatarfull} alt="" />
            </div>
        )
    }
}