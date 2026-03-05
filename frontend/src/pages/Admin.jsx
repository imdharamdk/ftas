import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts";

function Admin(){

const [stats,setStats]=useState({});
const [users,setUsers]=useState([]);

useEffect(()=>{

const admin=localStorage.getItem("admin");

if(!admin){

window.location="/admin-login";

}

loadStats();
loadUsers();

},[]);


async function loadStats(){

try{

const res=await axios.get(
"http://localhost:5000/api/admin/stats"
);

setStats(res.data);

}catch(err){

console.log(err);

}

}


function loadUsers(){

const user=localStorage.getItem("user");

if(user){

setUsers([JSON.parse(user)]);

}

}


// DELETE USER
function deleteUser(){

localStorage.removeItem("user");

setUsers([]);

alert("User deleted");

}


// LOGOUT
function logout(){

localStorage.removeItem("admin");

window.location="/";

}


const chartData=[
{ name:"Visitors", value:stats.visitors || 0 },
{ name:"Users", value:users.length }
];


return(

<div>

<Navbar/>

<div className="container">

<h2>Admin Dashboard</h2>

<button onClick={logout}>
Logout
</button>


{/* PLATFORM STATS */}

<div className="card">

<h3>Platform Analytics</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="name" />

<YAxis />

<Tooltip />

<Bar dataKey="value" fill="#2563eb" />

</BarChart>

</ResponsiveContainer>

</div>


{/* USER LIST */}

<div className="card">

<h3>User Accounts</h3>

<table>

<thead>

<tr>

<th>Email</th>
<th>Subscription</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{users.map((u,i)=>(

<tr key={i}>

<td>{u.email}</td>

<td>
{localStorage.getItem("subscription") ?
JSON.parse(localStorage.getItem("subscription")).plan :
"None"}
</td>

<td>
{localStorage.getItem("subscription") ?
"Active" :
"No Subscription"}
</td>

<td>

<button onClick={deleteUser}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Admin;
