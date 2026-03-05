import React, { useEffect, useState } from "react";
import axios from "axios";

function FearGreed() {

const [data, setData] = useState(null);

useEffect(() => {
loadData();
}, []);

async function loadData() {

try {

const res = await axios.get(
"http://localhost:5000/api/market/fear-greed"
);

setData(res.data);

} catch (error) {

console.log(error);

}

}

return (

<div style={{padding:"10px"}}>

<h3>Fear & Greed Index</h3>

{data ? (

<div>

<p>Score: {data.value}</p>
<p>Market Mood: {data.value_classification}</p>

</div>

) : (

<p>Loading...</p>

)}

</div>

);

}

export default FearGreed;
