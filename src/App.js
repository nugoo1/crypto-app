import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import numeral from 'numeral';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      map1: [],
      globals: []
    };
  }
  
  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=100')
      .then(res => {
        const cryptos = res.data.data;
        console.log(cryptos);
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

    axios.get('https://api.coinmarketcap.com/v2/global/ ')
      .then(res => {
        const globals = res.data.data;
        console.log(globals);
        this.setState({globals});
        });  
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
  render() {
    return (   
      <div className="App">
        <div className="global-container">
          <ul>
            <li className="hide"><span className="icon-bullet">•</span> Cryptocurrencies: {(this.state.globals.active_cryptocurrencies)}</li>
            <li className="hide"><span className="icon-bullet">•</span> Markets: {(this.state.globals.active_markets)}</li>
            <li><span className="icon-bullet">•</span> BTC Dominance: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>  
          </ul>
        </div>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
      <div className="header-container">
   
      <img src="/images/gunda_power_ad.jpg" alt="Sponsored by www.gundapower.com" className="header-ad" />
      <a target="_blank" href ="http://www.gundapower.com"></a>
      </div>
      <h1 className="title">Top 100 Cryptocurrencies By Market Capitalization</h1>
      <div className="crypto-container main-row bold">
        <table className="table-style">
          <tbody>
            <tr className="flex-row">
              <td className="rank">#</td>
              <td className="name head-name">Name</td>
              <td className="symbol">Name</td>
              <td className="marketcap">Market Cap</td>
              <td className="price">Price</td>
              <td className="volume">Volume (24h)</td>
              <td className="circ">Circulating Supply</td>
              <td className="change">Change (24h)</td>
              <td className="graph">Price Graph (7d)</td>
            </tr>
          </tbody>
        </table>          
    </div>
      
        
       {Object.values(this.state.map1).map((value) => (
         <div className="crypto-container main-row" key={value.id}>
          <table className="table-style">
            <tbody> 
              <tr className="flex-row">
                <td className="rank">
                  {value.rank}.
                </td>
                <td className="symbol">
                  <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${value.id}.png`} alt={value.name} className="crypto-icon" />
                  {value.symbol}
                </td>
                <td className="name">
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${value.id}.png`} alt={value.name} className="crypto-icon" />
                  {value.name} ({value.symbol})
                </td>
                <td className="marketcap">
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.price*value.circ).format('$0,0')
                  ))}
                </td>
                <td className="price">
                  {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.price).format('$0,0.00')
                  ))}
                </td>
                <td className="volume">
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                 numeral(last.volume_24h).format('0,0') + ` ${value.symbol}`
                  ))}
                </td>
                <td className="circ">
                {numeral(value.tot).format('0,0')}
                </td>
                <td className="change">
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.percent_change_24h).format('0,0.00') + "%"
                   ))}
                </td>
                <td className="graph">
                <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${value.id}.png`} alt={value.name} className="graph-icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

  </div>
);
}
}

export default App;
