import React, {Component} from 'react';
import './Profile.css';

export default class CryptoAddresses extends Component {
        state = {
        }
    

    render() {
        // console.log(this.props)
        return(
                <main className="form-container">
                    <form className="stripe-form">
                        {/* <h1>Crypto Addresses</h1> */}
                        <h4 className="x" onClick={this.props.cryptoToggleFn}>X</h4>
                        <div className="display-row">
                            <h1>Bitcoin(BTC)</h1>
                            <img className="btc--logo" src='assets/BTC_logo.svg' alt="btc qr code" />
                        </div>
                        <img className="btc-qr-code" src='assets/btc-qr-code.png' alt="btc qr code" />
                        <h3>3DVNcof3xVgHimhZs8LQGoHPT6immzp2DR</h3>
                    </form>
                </main>
            )
    }
}
