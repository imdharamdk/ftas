const axios = require("axios");
const { RSI, EMA } = require("technicalindicators");

async function generateSignal(symbol) {
  try {

    const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=100`;

    const response = await axios.get(url);

    const closes = response.data.map(c => parseFloat(c[4]));

    const rsi = RSI.calculate({
      values: closes,
      period: 14
    });

    const ema100 = EMA.calculate({
      values: closes,
      period: 100
    });

    const lastPrice = closes[closes.length - 1];
    const lastRSI = rsi[rsi.length - 1];
    const lastEMA = ema100[ema100.length - 1];

    let signal = "HOLD";

    if (lastPrice > lastEMA && lastRSI < 35) {
      signal = "BUY";
    }

    if (lastPrice < lastEMA && lastRSI > 65) {
      signal = "SELL";
    }

    return {
      symbol,
      price: lastPrice,
      rsi: lastRSI,
      ema: lastEMA,
      signal
    };

  } catch (error) {
    console.error("Signal error:", error.message);
    return null;
  }
}

module.exports = { generateSignal };