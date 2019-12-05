import React, {Component} from 'react';
import './User.css';
import {withRouter} from 'react-router-dom';


class FollowedUser extends Component {
    constructor() {
        super() 

        this.state = {

        }
    }

    pushFn() {
        this.props.history.push(`/user/${this.props.followedUserObj.profile.account_id}`)
        window.location.reload(false);
    }


    render() {
        console.log(this.props)
        return(
            <div className="followee-cont" onClick={() => this.pushFn()}>
                <h3>{this.props.followedUserObj.profile.personaname}</h3>
                <img className="profile-img-followee" src={this.props.followedUserObj.profile.avatarfull} alt="" />
            </div>
        )
    }
}

export default withRouter(FollowedUser)