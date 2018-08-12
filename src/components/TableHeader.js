import React from 'react';

const tableHeader = () => (
    <div>      
        <h1 className="title">Top 100 Cryptocurrencies By Market Capitalization</h1>
    <div className="crypto-container main-row bold">
        <table className="table-style">
            <thead>
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
            </thead>
            <tbody>  
            </tbody>
        </table>          
    </div>
  </div>
);

export default tableHeader;