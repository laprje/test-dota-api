import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
import {Link} from 'react-router-dom';




export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        if (this.props.userObj) {
            axios
            .get(`https://api.opendota.com/api/players/${this.props.userObj.account_id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    data: res.data
                })
            })
        } else {
            axios
            .get(`https://api.opendota.com/api/players/${this.props.match.params.id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    data: res.data
                })
            })
        }
    }
    

    render() {      
        // console.log(this.props)

        return (
            <div className="user-cont">
                {/* only rendered on dashboard */}
                {this.props.userObj ? (
                    <Link className="link" to={`/user/${this.props.userObj.account_id}`}>
                        <div className="user">

                            {this.state.data ? (
                            <div className="user-info">
                                <h1>{this.state.data.profile.personaname}</h1>
                                <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                            </div>
                            ) : null }

                        </div>
                    </Link>
                ) :
                // rendered on single user page
                    <div className="user">
                        {this.state.data ? (
                        <div className="user-info">
                            <h1>{this.state.data.profile.personaname}</h1>
                            <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                        </div>
                        ) : null }
                    </div>
                }
            </div>
        )
    }
}