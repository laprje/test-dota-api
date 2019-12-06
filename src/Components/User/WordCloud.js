import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import './User.css';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import WordCloud from 'react-d3-cloud';




export default class WordCloudComp extends Component {
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
        setTimeout(1000)
        this.getWords()
        console.log(this.state.allWords)
        })
    }

    getWords() {
        let myObject = this.state.allWords.all_word_counts
        const words = [
            {
            text: "", 
            value: 84,
            }
        ]

        for (let i = 5; i < 1000; i ++) {
            let k = Math.floor(Math.random() * 5000)
            words.push({text: `${Object.keys(myObject)[k]}`, value: Object.values(myObject)[k]})
        }

        this.setState({
            stateWords: words,
        })
    }

    render() {

        const fontSizeMapper = word => Math.log2(word.value) * 2;
        const rotate = word => word.value % 90;


        return(
            <div className="doughnut">
                    <div classname="pre-word-cloud-cont">
                        <h1>Word Cloud</h1>
                        <h3>(Click and hold to enlarge)</h3>
                    
                    {this.state.allWords ? (
                    <div className="word-cloud">

                        <WordCloud
                            data={this.state.stateWords}
                            fontSizeMapper={fontSizeMapper}
                            rotate={rotate}
                        />

                    </div>
                    ) : null }
                </div>
            </div>
        )
    }
}
