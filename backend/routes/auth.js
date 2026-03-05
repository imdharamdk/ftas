const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");


// USER SIGNUP
router.post("/signup", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    await authController.signup(req, res);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Signup failed"
    });

  }
});



// USER LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    await authController.login(req, res);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login failed"
    });

  }
});



module.exports = router;
