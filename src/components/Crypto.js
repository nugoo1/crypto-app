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
      axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.props.match.params.id}&tsym=USD&limit=200&aggregate=3&e=Kraken&extraParams=nugoo`)
        .then(res => {
            console.log(res.data.Data);
            let data = res.data.Data;
                for (let i=0; i < data.length; i++) {
                this.state.labels.push(moment(data[i].time * 1000).format('MMMM Do YYYY, h:mm:ss a'));
                this.state.data1.push(data[i].open);
        }
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
        console.log(this.state.labels);
        console.log(this.state.data1);
        });
    };

    render() {
        return (
            <div className="crypto-graph">
            <Line data= {this.state.data}/>
               
            </div>
        )
    }
  }
  
export default CryptoMethod;

// const cryptoMethod = (data) => {
//     labels = []
//     data1 = []
//     for (let i=0; i < data.length; i++) {
//         labels.push(moment(data[i].time * 1000).format('MMMM Do YYYY, h:mm:ss a'));
//         data1.push(data[i].open);
//     }
//     return data;
// }
// const Crypto = (props) => {
// const cryptoName = props.match.params.id.toUpperCase()
// axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${cryptoName}&tsym=USD&limit=200&aggregate=3&e=Kraken&extraParams=nugoo`)
// .then(res => {
//     cryptoMethod(res.data.Data);

// }
// )

// console.log(labels);
// console.log(data1);
// const data = {
    
//     labels: labels,
//     datasets: [
//       {
//         label: cryptoName,
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: data1
//       }
//     ]
//   };


// }




// export default Crypto;