import React, {Component} from 'react';
import './Dashboard.css';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import User from '../User/User';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        axios
        .get('/api/users')
        .then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    

    

    render() {
        let key = 0;
        return (
            <div className="dashboard">
                <div>
                    <h1>Dashboard</h1>
                    <input 
                    
                    />
                </div>
            <div>
                {this.state.users.map(el => (
                    <User 
                    userObj={el} key={key++}
                    />
                ))}
            </div>


            </div>
        )
    }
}