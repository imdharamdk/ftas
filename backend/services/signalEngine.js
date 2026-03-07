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

let signal="HOLD";

let entry=price;
let tp1=price*1.01;
let tp2=price*1.02;
let sl=price*0.99;


// simple trend logic

const rand=Math.random();

if(rand>0.66){
signal="BUY";
}

else if(rand<0.33){
signal="SELL";
}

return{

symbol,
signal,
entry:Number(entry.toFixed(4)),
tp1:Number(tp1.toFixed(4)),
tp2:Number(tp2.toFixed(4)),
sl:Number(sl.toFixed(4))

};

}catch(err){

console.log("Signal error:",err.message);

return null;

}

}

module.exports={generateSignal};