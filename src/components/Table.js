import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const table = (props) => (
   <div>
    {Object.values(props.state.map1).map((value) => (
        <div className="crypto-container main-row" key={value.id}>
          <Link to={`/crypto/${value.symbol}`} className="crypto-link" params={{props}}>      
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
              
                {Object.values(props.state.cryptos[value.id].quotes).map((last) => (
                  <div className="flex-row">
                    <td className="marketcap">
                      {numeral(last.price * value.circ).format('$0,0')}
                    </td>
                    <td className="price">
                      {numeral(last.price).format('$0,0.00')}
                    </td>
                    <td className="volume">
                      {numeral(last.volume_24h).format('0,0') + ` ${value.symbol}`}
                    </td>
                    <td className="circ">
                      {numeral(value.tot).format('0,0')}
                    </td>
                  </div>
                ))}

                {Object.values(props.state.cryptos[value.id].quotes).map((last) => {
                  if (last.percent_change_24h > 0) {
                    return <td className="green change">
                      {numeral(last.percent_change_24h).format('0,0.00') + "%"}
                    </td>
                  } if (last.percent_change_24h < 0) {
                    return <td className="red change"> {numeral(last.percent_change_24h).format('0,0.00') + "%"} </td>
                  }
                }
                )}

                <td className="graph">
                  <img src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${value.id}.png`} alt={value.name} className="graph-icon" />
                </td>

              </tr>
            </tbody>
          </table>
          </Link>
        </div>
      ))}

      </div>

);

export default table;