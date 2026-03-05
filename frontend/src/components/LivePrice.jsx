import React, { useEffect, useState } from "react";

function LivePrice({ symbol }) {

const [price, setPrice] = useState(0);

useEffect(() => {

if(!symbol) return;

let socket;

function connect(){

socket = new WebSocket(
`wss://fstream.binance.com/ws/${symbol.toLowerCase()}@ticker`
);

socket.onmessage = (event) => {

const data = JSON.parse(event.data);

setPrice(data.c);

};

socket.onerror = () => {

console.log("WebSocket error");

};

socket.onclose = () => {

console.log("WebSocket reconnecting...");

setTimeout(connect, 3000);

};

}

connect();

return () => {

if(socket) socket.close();

};

}, [symbol]);

return (

<div>

<h3>Live Price</h3>

<p>{price}</p>

</div>

);

}

export default LivePrice;
