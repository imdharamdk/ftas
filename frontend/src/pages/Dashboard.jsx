import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const [signals,setSignals] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

loadSignals();

const interval = setInterval(()=>{
loadSignals();
},15000);

return ()=>clearInterval(interval);

},[]);



const loadSignals = async ()=>{

try{

const res = await axios.get("https://ftas.onrender.com/api/signals");

console.log("API response:",res.data);

if(Array.isArray(res.data)){

const sorted = res.data.sort((a,b)=>{
return a.symbol.localeCompare(b.symbol);
});

setSignals(sorted);

}else{

console.log("API returned error:",res.data);
setSignals([]);

}

}catch(err){

console.log("Fetch error:",err);
setSignals([]);

}

};



const openMarket=(symbol)=>{

navigate("/coin/"+symbol);

};



return(

<div className="container">

<h2 style={{marginBottom:"20px"}}>
Live Trading Signals
</h2>


<table className="signals-table">

<thead>

<tr>
<th>Coin</th>
<th>Signal</th>
<th>Entry</th>
<th>TP1</th>
<th>TP2</th>
<th>SL</th>
</tr>

</thead>


<tbody>

{signals.length === 0 ? (

<tr>
<td colSpan="6" style={{textAlign:"center"}}>
No signals available
</td>
</tr>

) : (

signals.map((s,i)=>(

<tr key={i}>

<td
className="coin"
onClick={()=>openMarket(s.symbol)}
>

{s.symbol}

</td>

<td>{s.signal}</td>

<td>{s.entry}</td>

<td>{s.tp1}</td>

<td>{s.tp2}</td>

<td>{s.sl}</td>

</tr>

))

)}

</tbody>

</table>

</div>

);

}

export default Dashboard;