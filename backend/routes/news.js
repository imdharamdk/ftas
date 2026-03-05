const express = require("express")
const router = express.Router()
const axios = require("axios")

router.get("/", async (req,res)=>{

try{

const response = await axios.get(
"https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
)

const news = response.data.Data

res.json(news)

}catch(error){

console.log(error)

res.status(500).json({
error:"Failed to fetch crypto news"
})

}

})

module.exports = router
