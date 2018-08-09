import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import numeral from 'numeral';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      map1: []
    };
  }
  
  componentDidMount() {
    axios.get(' https://api.coinmarketcap.com/v2/ticker/?limit=100')
      .then(res => {
        const cryptos = res.data.data;
        const map1 = Object.values(cryptos).map((val) => {
          return {
            id: val.id,           
            rank: val.rank,
            name: val.name,
            symbol: val.symbol,
            tot: val.total_supply,
            circ: val.circulating_supply
          }
        });
      axios.get('https://s2.coinmarketcap.com/static/img/coins/32x32/1808.png')
      .then(res => {
        const bigData = res.data;
        console.log(bigData);
      })
      
        function compare(a,b) {
          if (a.rank < b.rank)
            return -1;
          if (a.rank > b.rank)
            return 1;
          return 0;
        };   
        map1.sort(compare);
        this.setState({cryptos});
        this.setState({map1});
    });      
  };
  // 'https://s2.coinmarketcap.com/static/img/coins/32x32/1808.png'
  render() {
    return (
      <div className="App">
      <h1 className="title">Top 100 Cryptocurrencies By Market Capitalization</h1>
      <div className="crypto-container">
      <span className="left">Name </span>
      <span className="left">Market Cap </span>
      <span className="left">Price </span>
      <span className="left">Price </span>
      <span className="left">Price </span>
      <span className="right">Price</span>

      </div>
       {Object.values(this.state.map1).map((value) => (
         <div className="crypto-container" key={value.id}>
         <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${value.id}.png`} alt="Smiley face" height="42" width="42" />
         <span id={value.id} className="left" key={value.rank}>{value.rank}. </span>
          <span id={value.id} className="left" key={value.name}>{value.name} ({value.symbol})</span>
          {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
           <span className="right" key={last.price}>{numeral(last.price).format('$0,0.00')}</span>
          ))}
         </div>
       ))}
      </div>
    );
  }
}

export default App;
