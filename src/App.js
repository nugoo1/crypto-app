import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import numeral from 'numeral';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: []
    };
  }
  
  componentDidMount() {
    axios.get(' https://api.coinmarketcap.com/v2/ticker/?limit=25')
      .then(res => {
        const cryptos = res.data.data;
        console.log(cryptos);
         this.setState({cryptos});
      })      
  }
  render() {
    return (
      <div className="App">
       {Object.values(this.state.cryptos).map((value) => (
         <div className="crypto-container" key={value.id}>
          <span id={value.id} className="left" key={value.name}>{value.name}</span>
          {Object.values(this.state.cryptos[value.id].quotes).map((last) => (
           <span className="right" key={last.price}>{numeral(last.price).format('$0,0.0000')}</span>
          ))}
         </div>
       ))}
      </div>
    );
  }
}

export default App;
