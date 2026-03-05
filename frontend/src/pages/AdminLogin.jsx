import React,{useState} from "react";
import Navbar from "../components/Navbar";

function AdminLogin(){

const [id,setId]=useState("");
const [password,setPassword]=useState("");

function login(e){

e.preventDefault();

if(id==="admin" && password==="ftas123"){

localStorage.setItem("admin","true");

window.location="/admin";

}else{

alert("Invalid admin credentials");

}

}

return(

<div>

<Navbar/>

<div className="container">

<div className="card">

<h2>Admin Login</h2>

<form onSubmit={login}>

<input
type="text"
placeholder="Admin ID"
value={id}
onChange={(e)=>setId(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button type="submit">
Login
</button>

</form>

</div>

</div>

</div>

)

}

export default AdminLogin;
