const express = require("express");
const router = express.Router();

const { generateSignal } = require("../services/signalEngine");

const coins = [
"BTCUSDT",
"ETHUSDT",
"BNBUSDT",
"SOLUSDT",
"XRPUSDT",
"ADAUSDT",
"DOGEUSDT",
"AVAXUSDT",
"DOTUSDT",
"MATICUSDT"
];

router.get("/", async (req,res)=>{

try{

const signals=[];

for(const symbol of coins){

const signal = await generateSignal(symbol);

if(signal){

signals.push(signal);

}else{

signals.push({
symbol,
signal:"HOLD",
entry:0,
tp1:0,
tp2:0,
sl:0
});

}

}

res.json(signals);

}catch(err){

console.log("Signals API error:",err);

res.json([]);

}

});

module.exports = router;