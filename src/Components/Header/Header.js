import React, {Component} from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'




class Header extends Component {

    render() {      
        console.log(this.props)
        return (
            <header className="app-header">
                <Link to="/" className="link">
                    <div className="logo">
                        <img src="assets/Dota-2-Logo.png" alt="dota logo"/>
                        <h1 className="title">Dota 100</h1>
                    </div>
                </Link>
                    {this.props.user_id ? (
                        <div className="login-cont">
                        <h2>{this.props.username}</h2>
                        <Link to="/profile" className="link">
                            <i className="fas fa-cog" />
                        </Link>
                    </div>
                    ) :
                <Link to="/auth" className="link">
                    <div className="login-cont">
                        <h2>Login</h2>/
                        <h2>Register</h2>
                    </div>
                </Link>
                }
            </header>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(Header)