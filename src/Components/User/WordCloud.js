import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import './User.css';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import words from './words';




export default class WordCloud extends Component {
    state = {
        allWords: [],
        stateWords: [],
    }

    componentDidMount() {
        axios
        .get(`https://api.opendota.com/api/players/${this.props.userId}/wordcloud`)
        .then(res => {
            this.setState({
                allWords: res.data
            })
        console.log(this.state.allWords.all_word_counts)
        this.getWords()
        })
    }

    getWords() {
        let myObject = this.state.allWords.all_word_counts
        const words = [
            {
            text: 'told',
            value: 64,
            },
            {
            text: 'mistake',
            value: 11,
            },
        ]

        for (let key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                // console.log(myObject[key])
            }
        }

        console.log(Object.keys(myObject)[0])

        this.setState({
            stateWords: words,
        })
    }

    render() {

    

        return(
            <div className="doughnut">
                <div className="doughnut-cont">
                    <h1>Top Words All Time</h1>
                    {/* <Doughnut data={data} />
                     */}
                    {this.state.allWords ? ( 
                    <ReactWordcloud words={this.state.stateWords} />
                    ) : null }
                </div>
            </div>
        )
    }
}
