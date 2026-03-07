const axios = require("axios");

async function generateSignal(symbol){

try{

const url = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`;

const response = await axios.get(url,{
headers:{
"User-Agent":"Mozilla/5.0"
},
timeout:10000
});

const price = parseFloat(response.data.price);

if(!price){
return null;
}

let signal="HOLD";
let entry=null;
let tp1=null;
let tp2=null;
let sl=null;


// simple trend generator

const r=Math.random();

if(r>0.66){
signal="BUY";
}

else if(r<0.33){
signal="SELL";
}


// BUY logic

if(signal==="BUY"){

entry=price;
tp1=price*1.01;
tp2=price*1.02;
sl=price*0.99;

}


// SELL logic

if(signal==="SELL"){

entry=price;
tp1=price*0.99;
tp2=price*0.98;
sl=price*1.01;

}


return{

symbol,
signal,
entry: entry ? Number(entry.toFixed(4)) : null,
tp1: tp1 ? Number(tp1.toFixed(4)) : null,
tp2: tp2 ? Number(tp2.toFixed(4)) : null,
sl: sl ? Number(sl.toFixed(4)) : null

};

}catch(err){

console.log("Signal error:",err.message);

return null;

}

}

module.exports={
generateSignal
};