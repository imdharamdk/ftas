const express = require("express");
const router = express.Router();

// signal engine import
const { generateSignal } = require("../services/signalEngine");

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

      try {

        const signal = await generateSignal(coin);

        if (signal) {
          signals.push(signal);
        }

      } catch (err) {

        console.error(`Signal error for ${coin}:`, err.message);

      }

    }

    res.json({
      success: true,
      total: signals.length,
      signals: signals
    });

  } catch (error) {

    console.error("Signals API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate signals"
    });

  }

});

module.exports = router;