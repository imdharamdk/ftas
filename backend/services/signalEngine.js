const axios = require("axios");

async function generateSignal(symbol) {

  try {

    const url = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`;

    const response = await axios.get(url);

    const price = parseFloat(response.data.price);

    const entry = price;

    const tp1 = parseFloat((price * 1.01).toFixed(4));
    const tp2 = parseFloat((price * 1.02).toFixed(4));
    const sl = parseFloat((price * 0.99).toFixed(4));

    return {
      symbol: symbol,
      signal: "BUY",
      entry: entry,
      tp1: tp1,
      tp2: tp2,
      sl: sl
    };

  } catch (error) {

    console.log("Signal generation error:", error.message);

    return null;

  }

}

module.exports = {
  generateSignal
};