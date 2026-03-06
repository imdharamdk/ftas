const axios = require("axios");
const ti = require("technicalindicators");

async function generateSignal(symbol) {
  try {

    const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=210`;

    const response = await axios.get(url);

    const candles = response.data;

    const closes = candles.map(c => parseFloat(c[4]));
    const volumes = candles.map(c => parseFloat(c[5]));

    const close = closes[closes.length - 1];
    const volume = volumes[volumes.length - 1];

    // EMA 50
    const ema50 = ti.EMA.calculate({
      period: 50,
      values: closes
    }).pop();

    // EMA 200
    const ema200 = ti.EMA.calculate({
      period: 200,
      values: closes
    }).pop();

    // RSI
    const rsi = ti.RSI.calculate({
      period: 14,
      values: closes
    }).pop();

    // Average Volume
    const avgVolume =
      volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;

    const volumeSpike = volume > avgVolume * 1.3;

    let signal = null;

    // BUY SIGNAL
    if (
      ema50 > ema200 &&
      rsi > 45 &&
      rsi < 65 &&
      volumeSpike
    ) {

      signal = {
        symbol: symbol,
        type: "BUY",
        entry: close,
        tp1: +(close * 1.006).toFixed(4),
        tp2: +(close * 1.012).toFixed(4),
        stopLoss: +(close * 0.992).toFixed(4),
        rsi: rsi.toFixed(2)
      };

    }

    // SELL SIGNAL
    if (
      ema50 < ema200 &&
      rsi < 55 &&
      rsi > 35 &&
      volumeSpike
    ) {

      signal = {
        symbol: symbol,
        type: "SELL",
        entry: close,
        tp1: +(close * 0.994).toFixed(4),
        tp2: +(close * 0.988).toFixed(4),
        stopLoss: +(close * 1.008).toFixed(4),
        rsi: rsi.toFixed(2)
      };

    }

    return signal;

  } catch (error) {

    console.log("Signal error:", symbol);

    return null;

  }
}

async function scanMarket(symbols) {

  const signals = [];

  for (const symbol of symbols) {

    const result = await generateSignal(symbol);

    if (result) {
      signals.push(result);
    }

  }

  return signals;

}

module.exports = {
  scanMarket
};