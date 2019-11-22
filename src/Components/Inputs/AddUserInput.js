import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';



class AddUserInput extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            account_id: '',
        }
    }

    componentDidMount() {
        this.setState({
            account_id: '',
        })
    }

    newuser() {
        axios
            .post('/api/users', this.state)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            this.componentDidMount()
            this.props.history.push(`/user/${this.state.account_id}`)
        }
    
    handleaccount_id(e) {
        this.setState({
            account_id: e.target.value
        })
        console.log(this.state.account_id)
    }

    render() {
        return (
            <div className="AddUserInput">
                <div className="flex-row">
                    <button onClick={(e) => this.newuser(e)}>Add User to Database: </button>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Insert Account ID#"
                        onChange={e => this.handleaccount_id(e)}
                        name='account_id'
                        value={this.state.account_id}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(AddUserInput)