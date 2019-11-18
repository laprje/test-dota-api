import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';




const Header = props => {

    const logout = () => {
        axios
            .delete('/auth/logout')
            .then(res => {
                props.updateUserInfo({
                    username: '',
                    user_id: '',
                })
            })
        console.log("logged out")
    }



    return (
        <header className="app-header">
            <Link to="/" className="link">
                <div className="logo">
                    <img src="assets/Dota-2-Logo.png" alt="dota logo"/>
                    <h1 className="title">Dota 100</h1>
                </div>
            </Link>
            <div className="middle-items">
                <li>Leaderboard</li>
                <li>Records</li>
                <li>Trending</li>
            </div>
                {props.user_id ? (
                    <div className="login-cont">
                        <img className="avatar-icon" src='https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0' alt="" />
                        <div>
                            <h2 className="logged-in-user">{props.username}</h2>
                        </div>
                        <div className="dropdown">
                            <i className="fas fa-cog" />
                            <div className="dropdown-content">
                                <a href="#/profile">Profile Settings</a>
                                <a onClick={logout} href="#/auth">Logout</a>
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
        </header>
    )
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(Header)