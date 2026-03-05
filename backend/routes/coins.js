const express = require("express");
const router = express.Router();
const axios = require("axios");


// TOP VOLUME COINS
router.get("/volume", async (req,res)=>{

try{

const response = await axios.get(
"https://fapi.binance.com/fapi/v1/ticker/24hr"
);

let coins = response.data;

coins.sort((a,b)=>b.quoteVolume - a.quoteVolume);

const result = coins.slice(0,50).map(c=>({
symbol: c.symbol,
price: c.lastPrice,
change: c.priceChangePercent,
volume: c.quoteVolume
}));

res.json(result);

}catch(error){

console.log(error);

res.status(500).json({
error:"Failed to fetch coins"
});

}

});


// TOP GAINERS
router.get("/gainers", async (req,res)=>{

try{

const response = await axios.get(
"https://fapi.binance.com/fapi/v1/ticker/24hr"
);

let coins = response.data;

coins.sort((a,b)=>b.priceChangePercent - a.priceChangePercent);

const result = coins.slice(0,10).map(c=>({
symbol: c.symbol,
price: c.lastPrice,
change: c.priceChangePercent
}));

res.json(result);

}catch(error){

console.log(error);

res.status(500).json({
error:"Failed to fetch gainers"
});

}

});


// TOP LOSERS
router.get("/losers", async (req,res)=>{

try{

const response = await axios.get(
"https://fapi.binance.com/fapi/v1/ticker/24hr"
);

let coins = response.data;

coins.sort((a,b)=>a.priceChangePercent - b.priceChangePercent);

const result = coins.slice(0,10).map(c=>({
symbol: c.symbol,
price: c.lastPrice,
change: c.priceChangePercent
}));

res.json(result);

}catch(error){

console.log(error);

res.status(500).json({
error:"Failed to fetch losers"
});

}

});



module.exports = router;
