import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';



class LoggedInUser extends Component {


    componentDidMount() {
        axios
            .get('/auth/getUser')
            .then(res => {
                this.props.updateUserInfo({
                    username: res.data.username,
                    user_id: res.data.user_id,
                    profile_img: res.data.profile_img,
                    email: res.data.email
                })
                // console.log(res.data)
            })
    }

    render() {
        return(
            <div>
                {this.props.user_id ? (
                <div className="login-cont">
                    <Link className="link" to={`/user/${this.props.profile_id}`}>
                        <h2 className="logged-in-user">{this.props.username}</h2>
                    </Link>
                    <Link className="link" to={`/user/${this.props.profile_id}`}>
                        <img className="avatar-icon" src={this.props.profile_img} alt="" />
                    </Link>
                    <div className="dropdown">
                        <i className="fas fa-cog" />
                        <div className="dropdown-content">
                            <a href={`#/user/${this.props.profile_id}`}>My Profile</a>
                            <a href="#/profile">Profile Settings</a>
                            <a onClick={this.props.logout} href="#/auth">Logout</a>
                        </div>
                    </div>
                </div>
            ) :
        <Link to="/auth" className="link">
            <div className="login-cont-2">
                <h2>Login</h2>
                <i className="fas fa-user"></i>
            </div> 
        </Link> 
        }
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(LoggedInUser)