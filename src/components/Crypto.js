import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Line} from 'react-chartjs-2';

class CryptoMethod extends Component {
    constructor(props) {
      super(props);
      this.state = {
        labels: [],
        data1: [],
        data: {}
      };
    }
    componentDidMount() {
      axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.props.match.params.id}&tsym=USD&limit=200&aggregate=100&e=Kraken&extraParams=nugoo`)
        .then(res => {
            let data = res.data.Data;
                for (let i=0; i < data.length; i++) {
                this.state.labels.push(moment(data[i].time * 1000).format('lll'));
                this.state.data1.push(data[i].open);
        }
        // This is the format chart.js expects
        this.setState(() => this.state.data = {
            labels: this.state.labels,
            datasets: [
                {
                label: this.props.match.params.id,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt', 
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.data1
                }
            ]
        })
        });
    };
    
    render() {
        return (
            <div className="title">
             <h1>{this.props.match.params.id}</h1>
                <div className="crypto-graph-container">
                    <div className="crypto-graph">
                    {this.state.data1.length > 0 ?
                        <Line data= {this.state.data}
                        options={{
                            maintainAspectRatio: false
                        }}/>
                        :
                        <p>Chart data for this coin is currently unavailable. We are working towards fixing this issue!</p>  }
                    </div>
                </div>    
            </div>
            
        )
    }
  }
  
export default CryptoMethod;
