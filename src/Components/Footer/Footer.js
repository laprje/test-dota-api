import React, {Component} from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {


    render() {
        return(
            <footer>
                <ul>
                    <Link to="/about">
                        <h5>ABOUT</h5>
                    </Link>
                    <Link to="/faq">
                        <h5>FAQ</h5>
                    </Link>
                    <Link to="/contact">
                        <h5>CONTACT</h5>
                    </Link>
                    <a href="https://github.com/StephenHubbard/dota-api">
                        <h5>GITHUB</h5>
                    </a>
                </ul>
                <div className="contact-me-cont">
                    <h6>The creator of Dota 100 is looking for a job! Contact me here: </h6>
                    <div className="social-media-btns">
                        <a href="https://www.linkedin.com/in/stephen-hubbard-8ab5b713a/">
                            <img className="linkedin-logo" src="https://icons-for-free.com/iconfiles/png/512/linkedin+linkedin+logo+networking+social+media+icon-1320196081476022403.png" alt=""/>
                        </a>
                        <a href="https://www.facebook.com/stephen.hubbard.1694">
                            <img src="https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png" alt=""/>
                        </a>
                        <a href="https://github.com/StephenHubbard">
                            <img className="github-logo" src="http://pngimg.com/uploads/github/github_PNG83.png" alt=""/>
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer