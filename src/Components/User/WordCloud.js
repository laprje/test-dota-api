import React, {Component} from 'react';
import './User.css';
import axios from 'axios';
// import ReactWordcloud from 'react-wordcloud';
import WordCloud from 'react-d3-cloud';
import { Ring } from 'react-awesome-spinners'




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

        for (let i = 5; i < 2000; i ++) {
            let k = Math.floor(Math.random() * 5000)
            words.push({text: `${Object.keys(myObject)[k]}`, value: Object.values(myObject)[k]})
        }

        this.setState({
            stateWords: words,
        })
    }

    render() {

        const fontSizeMapper = word => Math.log2(word.value) * 3;
        const rotate = word => word.value % 90;


        return(
            <div className="doughnut">
                <div className="doughnut-cont">
                    <div classname="word-cloud-text-cont">
                        <h1>Word Cloud</h1>
                        <h3>(Click and hold to enlarge)</h3>
                        
                    </div>
                    {this.state.stateWords.length > 1 ? (
                    <div>
                    <div className="word-cloud">

                        <WordCloud
                            data={this.state.stateWords}
                            fontSizeMapper={fontSizeMapper}
                            rotate={rotate}
                            padding="10px"
                        />
                    </div>
                    </div>
                    ) : 
                        <div className="loading-ring-word-cloud">
                            <Ring />
                        </div>
                    }

                </div> 
            </div>
        )
    }
}
