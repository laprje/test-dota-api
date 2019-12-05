import React, {Component} from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';
import { StripeProvider, Elements} from 'react-stripe-elements'
import { toast } from 'react-toastify';
import Form from './Form';
import CryptoAddresses from './CryptoAddresses';

toast.configure();



class Profile extends Component {
    constructor() {
        super()
    
        this.state = {
            user_id: '',
            email: '',
            account_id: '',
            profile_img: '',
            subToggle: false,
            cryptoToggle: false,
            blurClass: "blurNo",
        }
        this.subToggleFn = this.subToggleFn.bind(this)
        this.cryptoToggleFn = this.cryptoToggleFn.bind(this)
    }

    componentDidMount() {
        
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        })
    }

    handleAvatarChange = (value) => {
        this.setState({
            profile_img: value,
            user_id: this.props.user_id
        })
    }

    updateProfile = () => {
        axios
            .put('/auth/updateProfile', this.state)
            .then(
                this.props.updateUserInfo({
                    profile_img: this.state.profile_img,
                    email: this.state.email, 
                    account_id: this.state.account_id,
                })
            )
            .catch(err => console.log(err))
            console.log("profile updated")
    }

    subToggleFn = () => {
        this.setState({
            subToggle: !this.state.subToggle 
        })
        this.toggleClassName()
    }

    cryptoToggleFn = () => {
        this.setState({
            cryptoToggle: !this.state.cryptoToggle 
        })
        this.toggleClassName()
    }

    toggleClassName = () => {
        if (this.state.blurClass === "blurNo") {
            this.setState({
                blurClass: "blurYes"
            })
        } else {
            this.setState({
                blurClass: "blurNo"
            })
        }
    }


    render() {
        // console.log(this.props)
        return(
            <div>
            <div className={this.state.blurClass}>
            <div className="profile">
                <h1>Profile Settings</h1>
                <div className="display-row">
                    <div className="form">
                        <div className="display-column">
                            <div className="display-row">
                                <h3>Email:</h3>
                                <input
                                    placeholder={this.state.email} 
                                    type="text"
                                    onChange={e => this.handleChange('email', e.target.value)}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="display-row">
                                <h3>ID:</h3>
                                <input
                                    placeholder={this.state.account_id} 
                                    type="text"
                                    onChange={e => this.handleChange('account_id', e.target.value)}
                                    value={this.state.account_id}
                                />
                            </div>
                        </div>
                        <h3>Choose an avatar for your profile</h3>
                        <div className="avatar-container">                    
                            <img
                                onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/2/25/Ancient_Apparition_minimap_icon.png?version=e3becf8cdf1503d69b7df8d34b6ccfe3')} 
                                className="avatar-icon" 
                                src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/25/Ancient_Apparition_minimap_icon.png?version=e3becf8cdf1503d69b7df8d34b6ccfe3' 
                                alt="" 
                            />
                            <img 
                                onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/5/55/Pudge_minimap_icon.png?version=e9f2d6945ca53b69e16dc7f51d691359')} 
                                className="avatar-icon" 
                                src='https://gamepedia.cursecdn.com/dota2_gamepedia/5/55/Pudge_minimap_icon.png?version=e9f2d6945ca53b69e16dc7f51d691359' 
                                alt="" 
                            />
                            <img
                                onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0')} 
                                className="avatar-icon" 
                                src='https://gamepedia.cursecdn.com/dota2_gamepedia/f/fc/Ember_Spirit_minimap_icon.png?version=fa21609415641186a0e346b7ae675ca0' 
                                alt="" 
                            />
                            <img 
                                onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/2/21/Phoenix_minimap_icon.png?version=740203b2905840eee8fda6b8d6a6d6e0')} 
                                className="avatar-icon" 
                                src='https://gamepedia.cursecdn.com/dota2_gamepedia/2/21/Phoenix_minimap_icon.png?version=740203b2905840eee8fda6b8d6a6d6e0' 
                                alt="Phoenix avatar" 
                            />
                            <img
                                onClick={() => this.handleAvatarChange('https://gamepedia.cursecdn.com/dota2_gamepedia/9/9c/Bounty_Hunter_minimap_icon.png?version=4914405e8ba19df2e6b193ae378db02c')} 
                                className="avatar-icon" 
                                src='https://gamepedia.cursecdn.com/dota2_gamepedia/9/9c/Bounty_Hunter_minimap_icon.png?version=4914405e8ba19df2e6b193ae378db02c' 
                                alt="" 
                            />
                        </div>
                        
                        <button onClick={this.updateProfile}>Update</button>
                    </div>
                    
                        <div className="subscribe-container">
                            <h3>Donate Here</h3>
                            <p>Donate any amount and get a fancy badge on profile!</p>
                            <button className="stripe-btn" onClick={() => this.subToggleFn()}>Donate With Stripe</button>
                            <button className="stripe-btn" onClick={() => this.cryptoToggleFn()}>Bitcoin Address</button>


                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                                <input type="hidden" name="cmd" value="_donations" />
                                <input type="hidden" name="business" value="JQXL3EXVZUMLN" />
                                <input type="hidden" name="currency_code" value="USD" />
                                <button className="paypal-btn">Donate with Paypal</button>
                            </form>


                        </div>


                    </div>
                </div>
            </div>
                {this.state.subToggle ? (
                    <StripeProvider apiKey="pk_test_jS27Zws0qTn8N1rL3J45eXUZ00gFoG3e5w">
                        <Elements>
                            <Form 
                                subToggleFn={this.subToggleFn}
                            />
                        </Elements>
                    </StripeProvider>
                ) : null}

                {this.state.cryptoToggle ? (
                    <CryptoAddresses 
                        cryptoToggleFn={this.cryptoToggleFn}
                    />
                ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)