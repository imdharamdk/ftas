const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hash
    });

    await user.save();

    res.json({
      message: "User created"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Signup failed"
    });

  }

};



exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        error: "User not found"
      });

    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {

      return res.status(400).json({
        error: "Invalid password"
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "ftassecret"
    );

    res.json({
      token,
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Login failed"
    });

  }

};