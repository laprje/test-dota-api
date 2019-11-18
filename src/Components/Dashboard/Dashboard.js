import React, {Component} from 'react';
import './Dashboard.css';
import axios from 'axios';
import User from '../User/User';
import AddUserInput from '../Inputs/AddUserInput';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            users: [],
            heroes: '',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
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
                
                <AddUserInput 
                componentDidMountDashboard = {this.componentDidMount}
                />

                    {this.state.users ? (
                    <div className="dashboard-cont">
                        {this.state.users.map(el => (
                            <User 
                            userObj={el} key={key++}
                            />
                        ))}
                    </div>
                    ) : null }

            </div>
        )
    }
}