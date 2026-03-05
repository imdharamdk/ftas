const express = require("express");
const router = express.Router();

let visitors = 0;

router.get("/visit", (req,res)=>{
visitors++;
res.json({visitors});
});

router.get("/stats", (req,res)=>{

res.json({
visitors
});

});

module.exports = router;
