const express = require("express");
const router = express.Router();
const axios = require("axios");

const { getSignal } = require("../services/signalEngine");


// GET AUTO SIGNALS (TOP TRADING COINS)
router.get("/", async (req, res) => {

  try {

    // Binance Futures 24hr ticker data
    const response = await axios.get(
      "https://fapi.binance.com/fapi/v1/ticker/24hr"
    );

    const data = response.data;


    // Only USDT futures pairs
    const usdtPairs = data.filter(
      coin => coin.symbol.endsWith("USDT")
    );


    // Sort by trading volume
    usdtPairs.sort(
      (a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)
    );


    // Take TOP 50 coins
    const topCoins = usdtPairs.slice(0, 50);


    let signals = [];


    for (let coin of topCoins) {

      const signal = await getSignal(coin.symbol);

      signals.push({

        symbol: coin.symbol,
        volume: coin.quoteVolume,
        change24h: coin.priceChangePercent,
        ...signal

      });

    }


    res.json(signals);


  } catch (error) {

    console.log("Signals API error:", error);

    res.status(500).json({
      error: "Failed to fetch signals"
    });

  }

});



// GET SINGLE COIN SIGNAL
router.get("/:symbol", async (req, res) => {

  try {

    const symbol = req.params.symbol.toUpperCase();

    const signal = await getSignal(symbol);

    res.json(signal);

  } catch (error) {

    console.log("Single signal error:", error);

    res.status(500).json({
      error: "Signal generation failed"
    });

  }

});

module.exports = router;
