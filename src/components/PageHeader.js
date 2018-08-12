import React from 'react';
import HeaderAdvert from './HeaderAdvert';

const pageHeader = (props) => (
        <div className="App">
            <div className="global-container">
            <ul>
                <li className="hide"><span className="icon-bullet">•</span> Cryptocurrencies: {(props.state.globals.active_cryptocurrencie)}</li>
                <li className="hide"><span className="icon-bullet">•</span> Markets: {(props.state.globals.active_markets)}</li>
                <li><span className="icon-bullet">•</span> BTC Dominance: {(props.state.globals.bitcoin_percentage_of_market_cap)}%</li>  
            </ul>
            </div>
        <HeaderAdvert />

      </div>

);


export default pageHeader;