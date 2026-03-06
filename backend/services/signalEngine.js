const axios = require("axios");
const { EMA, RSI, BollingerBands } = require("technicalindicators");

async function generateSignal(symbol) {
  try {

    const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=120`;

    const response = await axios.get(url);

    const candles = response.data;

    const closes = candles.map(c => parseFloat(c[4]));
    const volumes = candles.map(c => parseFloat(c[5]));
    const highs = candles.map(c => parseFloat(c[2]));
    const lows = candles.map(c => parseFloat(c[3]));

    const price = closes[closes.length - 1];

    // Indicators
    const ema50 = EMA.calculate({ period: 50, values: closes });
    const ema200 = EMA.calculate({ period: 200, values: closes });
    const rsi = RSI.calculate({ period: 14, values: closes });

    const bb = BollingerBands.calculate({
      period: 20,
      values: closes,
      stdDev: 2
    });

    const lastEMA50 = ema50[ema50.length - 1];
    const lastEMA200 = ema200[ema200.length - 1];
    const lastRSI = rsi[rsi.length - 1];

    const lastBB = bb[bb.length - 1];

    const lowerBB = lastBB.lower;
    const upperBB = lastBB.upper;

    // Volume
    const lastVolume = volumes[volumes.length - 1];
    const avgVolume =
      volumes.slice(volumes.length - 20).reduce((a, b) => a + b) / 20;

    const volumeSpike = lastVolume > avgVolume;

    // Support / Resistance
    const support = Math.min(...lows.slice(lows.length - 20));
    const resistance = Math.max(...highs.slice(highs.length - 20));

    let score = 0;
    let signal = "HOLD";

    // Trend
    if (lastEMA50 > lastEMA200) score += 25;
    if (lastEMA50 < lastEMA200) score += 25;

    // RSI
    if (lastRSI > 35 && lastRSI < 45) score += 15;
    if (lastRSI > 55 && lastRSI < 65) score += 15;

    // Bollinger
    if (price <= lowerBB) score += 15;
    if (price >= upperBB) score += 15;

    // Volume
    if (volumeSpike) score += 20;

    // Support / Resistance
    if (Math.abs(price - support) / price < 0.01) score += 10;
    if (Math.abs(price - resistance) / price < 0.01) score += 10;

    // Signal decision
    if (lastEMA50 > lastEMA200 && score >= 60) {
      signal = "BUY";
    }

    if (lastEMA50 < lastEMA200 && score >= 60) {
      signal = "SELL";
    }

    // Targets
    const tp1 = signal === "BUY" ? price * 1.01 : price * 0.99;
    const tp2 = signal === "BUY" ? price * 1.02 : price * 0.98;
    const stopLoss = signal === "BUY" ? price * 0.99 : price * 1.01;

    return {
      symbol,
      price,
      signal,
      rsi: lastRSI,
      ema50: lastEMA50,
      ema200: lastEMA200,
      score,
      tp1,
      tp2,
      stopLoss
    };

  } catch (error) {

    console.error("Signal error:", error.message);
    return null;

  }
}

module.exports = { generateSignal };