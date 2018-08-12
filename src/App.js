import React, { Component } from 'react';
import './styles/base/App.css';
import axios from 'axios';

import PageHeader from './components/PageHeader';
import TableHeader from './components/TableHeader';
import Table from './components/Table';

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
        const map1 = Object.values(res.data.data).map((val) => {
          return {
            id: val.id,
            rank: val.rank,
            name: val.name,
            symbol: val.symbol,
            tot: val.total_supply,
            circ: val.circulating_supply
          }
        });
        function compare(a, b) {
          if (a.rank < b.rank)
            return -1;
          if (a.rank > b.rank)
            return 1;
          return 0;
        };

        map1.sort(compare);
        this.setState({ cryptos });
        this.setState({ map1 });

        axios.get('https://api.coinmarketcap.com/v2/global/ ')
          .then(res => {
            const globals = res.data.data;
            this.setState({ globals });
          });
      });
  };
  
  render() {
    return (
      <div>
        <PageHeader state={this.state} />
        <TableHeader />
        <Table state={this.state}/>    
      </div>
    );
  }
}

export default App;
