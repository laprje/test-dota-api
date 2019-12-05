import React, {Component} from 'react';
import './User.css';
import {Link, withRouter} from 'react-router-dom';


class FollowedUser extends Component {
    constructor() {
        super() 

        this.state = {

        }
    }


    render() {
        console.log(this.props)
        return(
            <Link className="followee-row-link" onClick={() => this.props.history.push(`/user/${this.props.followedUserObj.profile.account_id}`)}>
            <div className="followee-cont" >
                <h3>{this.props.followedUserObj.profile.personaname}</h3>
                <img className="profile-img-followee" src={this.props.followedUserObj.profile.avatarfull} alt="" />
            </div>
            </Link>
        )
    }
}

export default withRouter(FollowedUser)