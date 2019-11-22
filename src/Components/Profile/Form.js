import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './Profile.css';

class Form extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            amount: '',
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try { 
            let { token }= await this.props.stripe.createToken({ name: this.state.name})
            let amount = this.state.amount;
            await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify({ token, amount })
            })
            // redirect, clear inputs, thank alert, toast
        } catch(e) {
            throw e;
        }
    }

    render() {
        // console.log(this.props)
        return(
                <main className="form-container">
                    <form onSubmit={this.handleSubmit} className="stripe-form">
                        <h4 className="x" onClick={this.props.subToggleFn}>X</h4>
                        <img className="by-stripe" src="assets/by-stripe.png" alt="stripe" />
                        <label>Name</label>
                        <input 
                            placeholder="Name"
                            type="text" 
                            value={this.state.name}
                            onChange={e => this.handleChange('name', e.target.value)}
                        />
                        <label>Amount($usd)</label>
                        <input
                            placeholder="Amount"
                            type="number" 
                            value={this.state.amount}
                            onChange={e => this.handleChange('amount', e.target.value)}
                        />
                        <label>CC Number - Exp Date - CVC - Zip</label>
                        <CardElement className="card-element" />
                        <button>Charge</button>
                    </form>
                </main>
            )
    }
}

export default injectStripe(Form);