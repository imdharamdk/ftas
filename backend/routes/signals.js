const express = require("express");
const router = express.Router();

const { generateSignal } = require("../services/signalEngine");

const coins=[
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

const signal=await generateSignal(symbol);

if(signal){
signals.push(signal);
}

}

res.json(signals);

}catch(err){

console.log("Signals API error:",err);

res.json([]);

}

});

module.exports=router;