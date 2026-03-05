import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Markets(){

const [coins,setCoins] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

loadCoins();

},[]);

const loadCoins = async ()=>{

try{

const res = await axios.get(
"https://fapi.binance.com/fapi/v1/ticker/24hr"
);

const filtered = res.data
.filter(c=>c.symbol.endsWith("USDT"))
.sort((a,b)=>b.quoteVolume-a.quoteVolume)
.slice(0,50);

setCoins(filtered);

}catch(err){

console.log(err);

}

};

const openCoin = (symbol)=>{

navigate("/coin/"+symbol);

};

return(

<div className="container">

<h2>Crypto Markets</h2>

<table className="signals-table">

<thead>

<tr>

<th>Coin</th>
<th>Price</th>
<th>24h Change</th>
<th>Volume</th>

</tr>

</thead>

<tbody>

{coins.map((coin,i)=>(

<tr key={i}>

<td
className="coin"
onClick={()=>openCoin(coin.symbol)}
>

{coin.symbol}

</td>

<td>

${parseFloat(coin.lastPrice).toFixed(4)}

</td>

<td
className={
coin.priceChangePercent > 0
? "buy"
: "sell"
}
>

{parseFloat(coin.priceChangePercent).toFixed(2)}%

</td>

<td>

${(coin.quoteVolume/1000000).toFixed(2)}M

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Markets;

