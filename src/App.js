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
            <li><span class="icon-bullet">•</span> Cryptocurrencies: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>
            <li><span class="icon-bullet">•</span> Markets: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>
            <li><span class="icon-bullet">•</span> Market Cap: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>
            <li><span class="icon-bullet">•</span> 24H Volume: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>
            <li><span class="icon-bullet">•</span> BTC Dominance: {(this.state.globals.bitcoin_percentage_of_market_cap)}%</li>  
          </ul>
        </div>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
      <div className="header-container">
      <a target="_blank" href ="http://www.gundapower.com">
      <img src="/images/gunda-power-ad.jpg" alt="Sponsored by www.gundapower.com" className="header-ad" />
      </a>
      
      <img src="/images/gunda-power-ad.jpg" alt="Sponsored by www.gundapower.com" className="header-ad" />
      </div>
      <h1 className="title">Top 100 Cryptocurrencies By Market Capitalization</h1>
      <div className="crypto-container main-row">
        <table className="table-style">
          <tbody>
            <tr className="flex-row">
              <td className="rank">#</td>
              <td className="name head-name">Name</td>
              <td className="text-center">Market Cap</td>
              <td className="text-center">Price</td>
              <td className="text-center">Volume (24h)</td>
              <td className="text-center">Circulating Supply</td>
              <td className="text-center">Change (24h)</td>
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
                <td className="name">
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${value.id}.png`} alt={value.name} className="crypto-icon" />
                  {value.name} ({value.symbol}
                </td>
                <td>
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.price*value.circ).format('$0,0.00')
                  ))}
                </td>
                <td>
                  {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.price).format('$0,0.00')
                  ))}
                </td>
                <td>
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                 numeral(last.volume_24h).format('0,0') + ` ${value.symbol}`
                  ))}
                </td>
                <td>
                {numeral(value.tot).format('0,0')}
                </td>
                <td>
                {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
                  numeral(last.percent_change_24h/100 * last.price).format('$0,0.00')
                   ))}
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
