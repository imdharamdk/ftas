const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({

ip:String,

visitedAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Visitor",VisitorSchema);
