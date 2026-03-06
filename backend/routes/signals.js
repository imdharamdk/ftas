const express = require("express");
const router = express.Router();

const { generateSignal } = require("../services/signalService");

router.get("/", async (req, res) => {

  try {

    const coins = [
      "BTCUSDT",
      "ETHUSDT",
      "SOLUSDT",
      "BNBUSDT",
      "XRPUSDT",
      "ADAUSDT",
      "DOGEUSDT",
      "LINKUSDT",
      "AVAXUSDT",
      "MATICUSDT"
    ];

    const signals = [];

    for (const coin of coins) {

      const signal = await generateSignal(coin);

      if (signal) {
        signals.push(signal);
      }

    }

    res.json(signals);

  } catch (error) {

    console.error("Signals API error:", error);
    res.status(500).json({ error: "Failed to generate signals" });

  }

});

module.exports = router;