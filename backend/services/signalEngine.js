const axios = require("axios");

async function generateSignal(symbol){

try{

// Binance futures kline data
const url =
`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=200`;

const res = await axios.get(url);

const closes = res.data.map(c => parseFloat(c[4]));

const price = closes[closes.length-1];


// -------- EMA CALCULATION --------

const ema = (data, period)=>{

let k = 2/(period+1);
let emaArray = [data[0]];

for(let i=1;i<data.length;i++){

emaArray.push(
data[i]*k + emaArray[i-1]*(1-k)
);

}

return emaArray;

};

const ema50 = ema(closes,50).pop();
const ema200 = ema(closes,200).pop();


// -------- RSI CALCULATION --------

const rsiCalc = (data,period=14)=>{

let gains=0;
let losses=0;

for(let i=data.length-period;i<data.length;i++){

let diff = data[i] - data[i-1];

if(diff>0) gains+=diff;
else losses-=diff;

}

let rs = gains/(losses||1);

return 100 - (100/(1+rs));

};

const rsi = rsiCalc(closes);


// -------- SIGNAL LOGIC --------

let signal="HOLD";
let entry=price;
let tp1=price;
let tp2=price;
let sl=price;


if(ema50 > ema200 && rsi < 60){

signal="BUY";

tp1 = price * 1.01;
tp2 = price * 1.02;
sl  = price * 0.99;

}

else if(ema50 < ema200 && rsi > 40){

signal="SELL";

tp1 = price * 0.99;
tp2 = price * 0.98;
sl  = price * 1.01;

}


// -------- RESULT --------

return{

symbol,
signal,
entry:price,
tp1,
tp2,
sl

};

}catch(err){

console.log(err.message);

return null;

}

}

module.exports = { generateSignal };