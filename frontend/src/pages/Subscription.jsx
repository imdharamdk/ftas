import React from "react";
import Navbar from "../components/Navbar";

function Subscription(){

function buyPlan(plan){

const sub = {
plan,
start: new Date().getTime()
};

localStorage.setItem("subscription",JSON.stringify(sub));

alert(plan + " activated");

window.location.href="/dashboard";

}

return(

<div>

<Navbar/>

<h2>Choose Your Plan</h2>

<div style={{display:"flex",gap:"20px"}}>

<div style={{border:"1px solid #ccc",padding:"20px"}}>

<h3>7 Day Trial</h3>

<p>Free for 7 days</p>

<button onClick={()=>buyPlan("trial")}>
Start Trial
</button>

</div>


<div style={{border:"1px solid #ccc",padding:"20px"}}>

<h3>Monthly Plan</h3>

<p>$20 / month</p>

<button onClick={()=>buyPlan("monthly")}>
Buy Monthly
</button>

</div>


<div style={{border:"1px solid #ccc",padding:"20px"}}>

<h3>Lifetime Plan</h3>

<p>$199 one time</p>

<button onClick={()=>buyPlan("lifetime")}>
Buy Lifetime
</button>

</div>

</div>

</div>

)

}

export default Subscription;
