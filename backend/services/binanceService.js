const axios = require("axios");

const BINANCE_API = "https://fapi.binance.com/fapi/v1/ticker/24hr";

async function getMarketData() {
  try {

    const response = await axios.get(BINANCE_API);

    let data = response.data;

    // Only USDT pairs
    data = data.filter(c => c.symbol.endsWith("USDT"));

    // Convert numeric values
    data = data.map(c => ({
      symbol: c.symbol,
      price: parseFloat(c.lastPrice),
      change: parseFloat(c.priceChangePercent),
      volume: parseFloat(c.quoteVolume)
    }));

    // Top Volume
    const topVolume = [...data]
      .sort((a,b) => b.volume - a.volume)
      .slice(0, 20);

    // Top Gainers
    const topGainers = [...data]
      .sort((a,b) => b.change - a.change)
      .slice(0, 20);

    // Top Losers
    const topLosers = [...data]
      .sort((a,b) => a.change - b.change)
      .slice(0, 20);

    // Most Volatile
    const mostVolatile = [...data]
      .sort((a,b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 20);

    return {
      topVolume,
      topGainers,
      topLosers,
      mostVolatile
    };

  } catch (error) {

    console.error("Binance API error", error.message);

    return {
      topVolume: [],
      topGainers: [],
      topLosers: [],
      mostVolatile: []
    };

  }
}

module.exports = {
  getMarketData
};
