import React, {Component} from 'react';
import './User.css';
import LowerContainer from './LowerContainer';
import DoughnutGraph from './DoughnutGraph';
import RecentStats from './RecentStats';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import FollowedUsers from './FollowedUsers';
import { Element } from 'react-scroll'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





class User extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            data: '',
            wl: '',
            recentMatches: '',
            followedUsers: [],
            followedUsersFinal: '',
            followedUsersData: [],
            thisUserId: '',
            isFollowing: false,
            toggleFollowWindow: false,
        }        
    }

    componentDidMount() {
        let newArr = []
        if (this.props.userObj) { 
            axios
            .get(`https://api.opendota.com/api/players/${this.props.userObj.account_id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            
        } else {
            const id = this.props.match.params.id
            axios
            .get(`https://api.opendota.com/api/players/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            axios
            .get('/api/followed')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    newArr.push(res.data[i].followee_id)
                    }
                })
                .then(res => {
                    this.setState({
                        followedUsers: newArr 
                    }, () => {
                        this.getAccountIds() 
                    })

                })
            })   
            axios
            .get(`api/users/${id}`)
            .then( res => {
                this.setState({
                    thisUserId: res.data[0]
                })
                this.isFollowingFn()

            })
            .catch(err => console.log(err))
        }
    }

    refreshPage() {
        window.location.reload()
    }

    isFollowingFn() {
        let this_user_id = this.state.thisUserId.user_id
        axios
        .post('/api/isFollowing', {this_user_id})
        .then(res => {
            if (res.data.length > 0) {
            if (this_user_id === res.data[0].followee_id) {
                this.setState({
                    isFollowing: true
                })
            } else {
                console.log("not following user")
            }
        } 
        })
    
    }

    getAccountIds() {
        this.loopUsers()
        this.delayThree() 
    }

    delayThree() {
        setTimeout(this.renderFollowedUsers, 1000)

    }
    
    loopUsers() {
        let newArr = []
        for (let i = 0; i < this.state.followedUsers.length; i++) {
            let user_id = this.state.followedUsers[i]
            axios
            .post('/api/followed/users', {user_id})
            .then(res => {
                newArr.push(res.data[0].account_id)
            }) 
        }
        this.setState({
            followedUsersFinal: newArr
        })
    }
    

    renderFollowedUsers = () => {
        let newArr = []
        for (let i = 0; i < this.state.followedUsersFinal.length; i++) {
            axios
                .get(`https://api.opendota.com/api/players/${this.state.followedUsersFinal[i]}`)
                .then(res => {
                    newArr.push(res.data)
                    this.setState({
                        followedUsersData: newArr
                    })
                })
            }    
        }

    deleteUser(id) {
        let this_user_id = this.state.thisUserId.user_id
        axios
            .post(`api/users/${id}`, { this_user_id }) 
            .then(res => {
                console.log("user deleted from db")
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
    }

    followUser(id) {
        const user_id = this.state.thisUserId.user_id
        axios
            .post(`auth/users/follow/${id}`, {user_id})
            .then(res => {
                this.componentDidMount()
                toast.success(`Now following ${this.state.data.profile.personaname}`, {
                    position: "top-right", 
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true, 
                    pauseOnHover: true,
                    draggable: true,
                    });
            })
            .catch(err => console.log(err))
    }

    unFollowUser(id) {
        const user_id = this.state.thisUserId.user_id
        axios
            .post(`auth/users/unfollow/${id}`, {user_id})
            .then(res => {
                this.componentDidMount()
                toast.error(`Now unfollowing ${this.state.data.profile.personaname}`, {
                    position: "top-right", 
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true, 
                    pauseOnHover: true,
                    draggable: true,
                    });
                this.setState({
                    isFollowing: false,
                })
            })
            .catch(err => console.log(err))
    }
    
    toggleFollowWindowFn() {
        if (this.state.followedUsersFinal) {
            this.setState({
                toggleFollowWindow: !this.state.toggleFollowWindow
            })
        } else {
            toast.error('Please login to follow users and compare stats', {
                position: "top-right", 
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                pauseOnHover: true,
                draggable: true,
                });
        }
        
        
    }
    

    render(props) {    
        let key = 0;  
        let key2 = 0;


        return (
            <div className="user-cont">
                {/* only rendered on dashboard */}
                {this.props.userObj ? (
                    
                    <Link className="link" to={`/user/${this.props.userObj.account_id}`}>
                        {this.state.data ? (
                        <div className="user">
                            <div className="user-info">
                                <div className="basic-info">
                                    <div className="name">
                                        <h1>{this.state.data.profile.personaname.substr(0, 9)}</h1>
                                        {this.state.data.profile.plus ? (
                                            <div className="dota-plus-icon-div">
                                                <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                                <span className="dota-plus-icon-tooltip">Dota Plus User</span>
                                            </div>
                                        ) : null}
                                    </div>
                                    <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                    {/* <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2> */}
                                </div>
                                <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                            </div>
                        </div>
                        ) : null }
                    </Link>
                ) :
                // rendered on single user page
                <div className="single-user">
                    <div className="top-two-divs">
                        <div className="display-column-top-container">
                            {this.props.is_admin ? (
                                <button className="delete-user" onClick={() => this.deleteUser(this.state.data.profile.account_id)}>Delete User</button>
                            ) : null }
                            {this.props.username ? (
                                <div>
                                {this.state.isFollowing ? (
                                <button onClick={() => this.unFollowUser(this.props.match.params.id)} className="follow-user">Unfollow</button>
                                ) : <button onClick={() => this.followUser(this.props.match.params.id)} className="follow-user">Follow</button>
                                }
                                </div>
                            ) : <h3 className="login-h3">Login to unlock more features!</h3> }
                        </div>
                        <div className="user-solo">
                            {this.state.data ? (
                                <div className="user-info">
                                        <div className="basic-info">
                                            <div className="name">
                                                <h1>{this.state.data.profile.personaname.substr(0, 9)}</h1>
                                                {this.state.data.profile.plus ? (
                                                    <div className="dota-plus-icon-div">
                                                        <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                                        <span className="dota-plus-icon-tooltip">Dota Plus User</span>
                                                    </div>                                                ) : null}
                                            </div>
                                            <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                            {/* <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2> */}
                                        </div>                            
                                        <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                                </div>

                            ) : null }
                        </div>


            {this.state.followedUsersFinal && this.state.toggleFollowWindow ? (
                <div className="display-row-minimize-cont">
                    <div className="follow-cont">
                    <Element name="test7" className="element" id="containerElement">

                            {this.state.followedUsersData ? (
                                this.state.followedUsersData.map(el => (
                                    <div key={key2++}>
                                    <Element name="firstInsideContainer" style={{
                                        marginBottom: '10px'
                                    }}>
                                    <FollowedUsers
                                    followedUserObj={el} key={key++}
                                    />
                                    </Element>
                                </div>
                                ))
                                ) : null }
                        
                    </Element>
                    </div>
                    <i className="fas fa-window-minimize" onClick={() => this.toggleFollowWindowFn()}></i>
                </div>
            ): null }
            {this.state.toggleFollowWindow ? (
            null 
            ) : <div className="my-followed-users">
            <h3>My Followed Users</h3>
            <i className="fas fa-expand" onClick={() => this.toggleFollowWindowFn()}></i>
            </div> }

                    

                    </div>
                    <div className="display-row">
                        <div className="recent-matches-container">
                            <LowerContainer 
                            userId = {this.props.match.params.id}
                            />
                        
                        </div>
                        <div className="display-column">
                            <div className="recent-stats-component-container">
                                <RecentStats 
                                    userId = {this.props.match.params.id}
                                />
                            </div>
                            <div className="donut-div">
                                <DoughnutGraph 
                                    userId = {this.props.match.params.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                }
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}
const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)