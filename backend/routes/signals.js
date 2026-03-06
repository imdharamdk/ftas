const express = require("express");
const router = express.Router();
const axios = require("axios");

const { generateSignal } = require("../services/signalEngine");

router.get("/", async (req, res) => {

  try {

    /* GET ALL FUTURES TICKERS */

    const response = await axios.get(
      "https://fapi.binance.com/fapi/v1/ticker/24hr"
    );

    let coins = response.data;

    /* FILTER USDT PAIRS */

    coins = coins.filter(c => c.symbol.endsWith("USDT"));

    /* SORT BY VOLUME */

    coins.sort((a,b) => b.quoteVolume - a.quoteVolume);

    /* TAKE TOP 30 COINS */

    coins = coins.slice(0,30);

    let signals = [];

    for (let coin of coins) {

      const signal = await generateSignal(coin.symbol);

      if(signal){
        signals.push(signal);
      }

    }

    res.json(signals);

  } catch (error) {

    console.log("Signals API error:", error);

    res.status(500).json({
      error:"Failed to fetch signals"
    });

  }

});

module.exports = router;