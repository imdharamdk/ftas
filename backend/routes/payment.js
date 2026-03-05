const express = require("express");
const router = express.Router();

let payments = [];

router.post("/submit",(req,res)=>{

  const {email,txid,plan} = req.body;

  payments.push({
    email,
    txid,
    plan,
    status:"pending"
  });

  res.json({
    message:"Payment submitted"
  });

});

router.get("/all",(req,res)=>{

  res.json(payments);

});

module.exports = router;
