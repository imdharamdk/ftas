const axios = require("axios");


// RSI calculation
function calculateRSI(closes, period = 14) {

  let gains = 0;
  let losses = 0;

  for (let i = closes.length - period; i < closes.length - 1; i++) {

    const diff = closes[i + 1] - closes[i];

    if (diff > 0) {
      gains += diff;
    } else {
      losses += Math.abs(diff);
    }

  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;

  return 100 - (100 / (1 + rs));

}



// EMA calculation
function calculateEMA(prices, period) {

  const k = 2 / (period + 1);

  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }

  return ema;

}



// SIGNAL GENERATOR
async function getSignal(symbol) {

  try {

    // Get candle data
    const response = await axios.get(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=100`
    );

    const candles = response.data;

    const closes = candles.map(c => parseFloat(c[4]));

    const price = closes[closes.length - 1];


    // indicators
    const rsi = calculateRSI(closes);

    const ema9 = calculateEMA(closes.slice(-9), 9);
    const ema21 = calculateEMA(closes.slice(-21), 21);


    let signal = "HOLD";

    if (ema9 > ema21 && rsi < 70) {
      signal = "BUY";
    }

    if (ema9 < ema21 && rsi > 30) {
      signal = "SELL";
    }


    // risk management
    const entry = price;
    const tp1 = price * 1.01;
    const tp2 = price * 1.02;
    const sl = price * 0.99;


    return {

      symbol,
      price,
      rsi,
      ema9,
      ema21,
      signal,
      entry,
      tp1,
      tp2,
      sl

    };

  } catch (error) {

    console.log("Signal Engine Error:", error.message);

    return {

      symbol,
      signal: "ERROR"

    };

  }

}

module.exports = {
  getSignal
};
