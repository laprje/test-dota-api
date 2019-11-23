import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import './User.css';
import axios from 'axios';



export default class DoughnutGraph extends Component {
    state = {
        allWords: [],
        wordsDesc: '',
        topWords: [],
    }

    componentDidMount() {
        axios
        .get(`https://api.opendota.com/api/players/${this.props.userId}/wordcloud`)
        .then(res => {
            this.setState({
                allWords: res.data
            })
            // this.listByDesc()
            console.log(this.state)
        })
    }

    // listByDesc() {
    //     console.log(this.state.allWords.all_word_counts)
    //     console.log(this.state.allWords.my_word_counts)
    //     this.state.allWords.sort(function (a, b) {
    //         return a - b;
    //     })
    // }

    render() {

    const data = {
        labels: [
            'GG',
            'reported',
            'Ez mid'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

        return(
            <div className="doughnut">
                <div className="doughnut-cont">
                    <h1>Potty Mouth?</h1>
                    <Doughnut data={data} />
                </div>
            </div>
        )
    }
}
