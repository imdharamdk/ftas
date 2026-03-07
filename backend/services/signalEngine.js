const axios = require("axios");
const ti = require("technicalindicators");

async function generateSignal(symbol){

try{

const url =
`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=200`;

const response = await axios.get(url,{
headers:{
"User-Agent":"Mozilla/5.0"
}
});

const data=response.data;

const closes=data.map(c=>parseFloat(c[4]));

const price=closes[closes.length-1];

const ema50=ti.EMA.calculate({
period:50,
values:closes
}).slice(-1)[0];

const ema200=ti.EMA.calculate({
period:200,
values:closes
}).slice(-1)[0];

const rsi=ti.RSI.calculate({
period:14,
values:closes
}).slice(-1)[0];


let signal="HOLD";
let entry=price;
let tp1=price;
let tp2=price;
let sl=price;


if(ema50>ema200 && rsi<60){

signal="BUY";

tp1=price*1.01;
tp2=price*1.02;
sl=price*0.99;

}

else if(ema50<ema200 && rsi>40){

signal="SELL";

tp1=price*0.99;
tp2=price*0.98;
sl=price*1.01;

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