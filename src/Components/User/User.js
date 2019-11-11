import React, {Component} from 'react';
import './User.css';
import LowerContainer from './LowerContainer';
import axios from 'axios';
import {Link} from 'react-router-dom';




export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: '',
            wl: '',
            recentMatches: '',
        }
    }

    componentDidMount() {
        if (this.props.userObj) {
            axios
            .get(`https://api.opendota.com/api/players/${this.props.userObj.account_id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
                // console.log(res.data)
            })
        } else {
            axios
            .get(`https://api.opendota.com/api/players/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        if (this.props.userObj) {
            axios
                .get(`https://api.opendota.com/api/players/${this.props.userObj.account_id}/wl`)
                .then(res => {
                    this.setState({
                        wl: res.data
                    })
                    // console.log(res.data)
                })
        } else {
            axios
                .get(`https://api.opendota.com/api/players/${this.props.match.params.id}/wl`)
                .then(res => {
                    this.setState({
                        wl: res.data
                    })
                    // console.log(res.data)
                })
            }
    }

    deleteUser(id) {
        axios
            .delete(`api/users/${id}`)
            .then(res => {
                console.log("user deleted from db")
            })
            .catch(err => console.log(err))
    }
    

    render(props) {      
        console.log(this.props)

        return (
            <div className="user-cont">
                {/* only rendered on dashboard */}
                {this.props.userObj ? (
                    <Link className="link" to={`/user/${this.props.userObj.account_id}`}>
                        <div className="user">
                            {this.state.data ? (
                            <div className="user-info">
                                <div className="basic-info">
                                    <div className="name">
                                        <h1>{this.state.data.profile.personaname}</h1>
                                        {this.state.data.profile.plus ? (
                                            <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                        ) : null}
                                    </div>
                                    <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                    <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2>
                                </div>
                                <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                            </div>
                            ) : null }
                        </div>
                    </Link>
                ) :
                // rendered on single user page
                <div className="single-user">
                    <div className="top-two-divs">
                        <div className="user-solo">
                            {this.state.data ? (
                                <div className="user-info">
                                        <div className="basic-info">
                                            <div className="name">
                                                <h1>{this.state.data.profile.personaname}</h1>
                                                {this.state.data.profile.plus ? (
                                                    <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                                ) : null}
                                            </div>
                                            <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                            <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2>
                                        </div>                            
                                        <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                                </div>

                            ) : null }
                        </div>

                        <button className="delete-user" onClick={() => this.deleteUser(this.state.data.profile.account_id)}>Delete User</button>
                    </div>
                    
                    <LowerContainer 
                    userId = {this.props.match.params.id}
                    />
                </div>
                }
            </div>
        )
    }
}