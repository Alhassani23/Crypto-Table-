import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [coin, setCoin] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins?currency=USD", {
        headers: {
          "X-API-KEY": "LnUo8FMbICis12CygIjv+sZzmbiWy1ygPnfnAOW/rA4=",
        },
      })
      .then((response) => setCurrency(response.data.result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <h2>Crypto Currency Table</h2>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setCoin(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th> Supply</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {currency
            .filter((coins) => {
              return coins.name.toLowerCase().includes(coin.toLowerCase());
            })
            .map((coins) => {
              return (
                <tr key={coins.id}>
                  <td className="rank">{coins.rank}</td>
                  <td className="logo">
                    <a href={coins.websiteUrl}>
                      <img src={coins.icon} alt="icon" />
                    </a>
                    <p>{coins.name}</p>
                  </td>
                  <td className="symbol">{coins.symbol}</td>
                  <td>${coins.marketCap}</td>
                  <td>{coins.price.toFixed(2)}</td>
                  <td>{coins.availableSupply}</td>
                  <td>{coins.volume.toFixed(0)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
