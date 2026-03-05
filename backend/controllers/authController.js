const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{

const {email,password} = req.body;

const hash = await bcrypt.hash(password,10);

const user = new User({
email,
password:hash
});

await user.save();

res.json({message:"User created"});

};

exports.login = async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){

return res.status(400).json({error:"User not found"});
}

const valid = await bcrypt.compare(password,user.password);

if(!valid){

return res.status(400).json({error:"Invalid password"});
}

const token = jwt.sign(
{id:user._id},
"ftassecret"
);

res.json({token,user});

};
