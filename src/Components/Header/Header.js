import React, {Component} from 'react';
import './Header.css';
import {Link} from 'react-router-dom';




export default class Header extends Component {
    render() {      
        return (
            <header className="app-header">
                <Link to="/" className="link">
                    <div className="logo">
                        <img src="assets/Dota-2-Logo.png" alt="dota logo"/>
                        <h1 className="title">Dota Api Project</h1>
                    </div>
                </Link>
                <div className="login-cont">
                    <h2>Login</h2>/
                    <h2>Register</h2>
                </div>
            </header>
        )
    }
}