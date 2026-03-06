import React, { useEffect, useState } from "react"
import axios from "axios"

function NewsFeed(){

const [news,setNews] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadNews()
},[])

async function loadNews(){

try{

const res = await axios.get(
"https://ftas.onrender.com/api/news"
)

setNews(res.data)
setLoading(false)

}catch(e){

console.log("News API error:",e)
setLoading(false)

}

}

return(

<div style={{padding:"10px"}}>

<h3>Crypto News</h3>

{loading && <p>Loading news...</p>}

{!loading && news.length===0 && <p>No news available</p>}

{news.slice(0,10).map((item,i)=>(

<div key={i} style={{marginBottom:"15px"}}>

<a
href={item.url}
target="_blank"
rel="noreferrer"
style={{color:"cyan"}}
>

{item.title}

</a>

<p style={{fontSize:"12px"}}>

{item.source_info?.name}

</p>

</div>

))}

</div>

)

}

export default NewsFeed
