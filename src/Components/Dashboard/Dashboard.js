import React, {Component} from 'react';
import './Dashboard.css';
import axios from 'axios';
// import {Link} from 'react-router-dom';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            users: [],
            data: null,
        }
    }

    componentDidMount() {
        axios
            .get("https://api.opendota.com/api/players/58684391")
            .then(res => {
                // console.log(res.data)
                this.setState({
                    data: res.data
                })
            })
    }

    

    render() {
        console.log(this.state.data)
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>


                {this.state.data ? (
                <div>
                    <h1>{this.state.data.profile.personaname}</h1>
                    <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                </div>
                ) : null }


            </div>
        )
    }
}