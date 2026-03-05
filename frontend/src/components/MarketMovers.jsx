import React, { useEffect, useState } from "react";
import axios from "axios";

function MarketMovers() {

  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const g = await axios.get(
        "https://ftas-api.onrender.com/api/coins/gainers"
      );

      const l = await axios.get(
        "https://ftas-api.onrender.com/api/coins/losers"
      );

      setGainers(g.data);
      setLosers(l.data);

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div style={{ padding: "10px" }}>

      <h3>Top Gainers</h3>

      {gainers.map((coin, i) => (

        <div key={i}>
          {coin.symbol} +{parseFloat(coin.change).toFixed(2)}%
        </div>

      ))}

      <h3 style={{ marginTop: "20px" }}>Top Losers</h3>

      {losers.map((coin, i) => (

        <div key={i}>
          {coin.symbol} {parseFloat(coin.change).toFixed(2)}%
        </div>

      ))}

    </div>

  );

}

export default MarketMovers;
