import React,{useEffect,useState} from "react";
import axios from "axios";

function CoinList({selectCoin}){

const [coins,setCoins]=useState([]);

useEffect(()=>{

loadCoins();

},[]);

async function loadCoins(){

const res=await axios.get(
"https://ftas.onrender.com/api/coins/volume"
);

setCoins(res.data.slice(0,30));

}

return(

<div className="sidebar">

<h3>Top Coins</h3>

{coins.map((coin,i)=>(

<div
key={i}
className="coin"
onClick={()=>selectCoin(coin.symbol)}
>

{coin.symbol}

</div>

))}

</div>

)

}

export default CoinList;
