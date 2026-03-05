import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Navbar(){

const [user,setUser]=useState(null);

useEffect(()=>{

const u=localStorage.getItem("user");

if(u){
setUser(JSON.parse(u));
}

},[]);


function logout(){

localStorage.removeItem("user");

alert("Logged out");

window.location="/";

}


return(

<div className="navbar">

<Link to="/">
<h2>FTAS</h2>
</Link>

<div className="nav-links">

<Link to="/">Home</Link>


{user && (

<>
<Link to="/dashboard">Signals</Link>

<Link to="/coin/BTCUSDT">Markets</Link>
</>

)}


{!user && (

<>
<Link to="/login">Login</Link>

<Link to="/signup">Signup</Link>
</>

)}


{user && (

<button onClick={logout}>
Logout
</button>

)}

</div>

</div>

)

}

export default Navbar;
