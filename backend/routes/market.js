const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/fear-greed", async (req, res) => {

  try {

    const response = await axios.get(
      "https://api.alternative.me/fng/?limit=1"
    );

    const data = response.data.data[0];

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch Fear & Greed index"
    });

  }

});

module.exports = router;
