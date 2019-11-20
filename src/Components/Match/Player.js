import React, {Component} from 'react';
import './Match.css'
import Heroes from '../../../src/heroes.json';


export default class Player extends Component {


    render() {
        // console.log(this.props)
        const host = 'http://cdn.dota2.com';
        return(
            <div className="player">
                <div className="display-row-start">
                    <img  className="hero-icon" src={`${host}.${Heroes[this.props.playerObj.hero_id].icon}`} alt="hero" />
                    <h2 className="player-name">{this.props.playerObj.personaname}</h2>
                </div>
                <div className="display-row-end">
                    {this.props.playerObj.isRadiant ? (
                    <h2>Radiant</h2>
                    ) : 
                    <h2>Dire</h2>
                    }
                    <h2>{this.props.playerObj.gold_per_min}</h2>
                    <h2>{this.props.playerObj.actions_per_min}</h2>
                </div>   
            </div>
        )
    }
}
