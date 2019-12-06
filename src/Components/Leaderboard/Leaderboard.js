import React, {Component} from 'react';
import './Leaderboard.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'


class Leaderboard extends Component {
    constructor(props) {
        super(props)
    
    this.state = {
        data: '',
        followedUsersDisplay: [],
        followedUsers: [],
        followedUsersFinal: '',
        followedUsersData: [{
                profile: {
                    personaname: "test"
                }
                }, 
                {
                profile: {
                    personaname: "test2"
                } 
                }],
        thisUserId: '',
        matches100: '',
        didUserWin100: '',
        userWin100: '',
        lineData: {
            labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            datasets: [
            {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
            }
            ]
        }, 

        }
    }

    componentDidMount() {
        console.log(this.state.lineData.datasets[0].data)
        let newArr = []
        const id = this.props.account_id
        axios
        .get(`https://api.opendota.com/api/players/${this.props.account_id}`)
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
        })
        .catch(err => console.log(err))
        axios
        .get(`https://api.opendota.com/api/players/${this.props.account_id}/matches?limit=100`)
        .then( res => {
            this.setState({
                matches100: res.data
            })
            console.log(this.state.matches100)
            this.didUserWin100()
        })
        .catch(err => console.log(err))

    }        

    didUserWin100() {
        let newArr = []
        for (let i = 0; i < this.state.matches100.length; i++) {
            if (this.state.matches100[i].player_slot > 99 && this.state.matches100[i].radiant_win === false) {
                newArr.push(true)
            } else if (this.state.matches100[i].player_slot > 99 && this.state.matches100[i].radiant_win === true) {
                newArr.push(false)
            } else if (this.state.matches100[i].player_slot < 99 && this.state.matches100[i].radiant_win === true) {
                newArr.push(true)
            } else if (this.state.matches100[i].player_slot < 99 && this.state.matches100[i].radiant_win === false) {
                newArr.push(false)
            }
        }
        this.setState({
            didUserWin100: newArr
        })
        this.calcMMR()
    }

    calcMMR() {
        let mmr = 4000;
        let newArr = [];
        let newArr2 = [];
        for (let i = 0; i < this.state.matches100.length; i++) {
            if (this.state.didUserWin100[i] === true) {
                mmr = mmr + 25
            } else {
                mmr = mmr - 25
            }
            newArr.push(mmr)
        }
        for (let i = 0; i < this.state.matches100.length; i++) {
            newArr2.push(`${i}`)
        }
        this.setState({
            lineData: {
                labels: newArr2,
                datasets: [
                {
                label: `${this.state.data.profile.personaname}`,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: newArr
                }
                ]
            },
        })
        console.log(this.state.lineData.datasets[0].data)
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


    render(props) {

        console.log(this.state.followedUsersData)
    
    
    


        return(
            <div className="leaderboard-page">
                <h1>Leaderboard</h1>



                {/* {this.state.followedUsersDisplay ? (
                    <div className="dashboard-cont">
                        {this.state.followedUsers.map(el => (
                            <User 
                            userObj={el} key={key++}
                            />
                        ))}
                    </div>
                    ) : null } */}

                {this.state.followedUsersData[1] ? (
                <div className="line-graph">
                    <h2>Last 100 Games</h2>
                    <Line data={this.state.lineData} />
                </div>
                ) : null }

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

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)