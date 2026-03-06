const express = require("express");
const router = express.Router();

const { generateSignal } = require("../services/signalEngine");

router.get("/", async (req, res) => {

  try {

    const coins = [
      "BTCUSDT",
      "ETHUSDT",
      "BNBUSDT",
      "XRPUSDT",
      "SOLUSDT",
      "ADAUSDT",
      "DOGEUSDT",
      "AVAXUSDT",
      "DOTUSDT",
      "LINKUSDT",
      "MATICUSDT",
      "LTCUSDT",
      "ATOMUSDT",
      "APTUSDT",
      "ARBUSDT"
    ];

    let signals = [];

    for (let symbol of coins) {

      const signal = await generateSignal(symbol);

      if (signal) {
        signals.push(signal);
      }

    }

    res.json(signals);

  } catch (error) {

    console.log("Signals API error:", error);

    res.status(500).json({
      error: "Failed to fetch signals"
    });

  }

});

module.exports = router;