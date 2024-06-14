// userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User1");
const Token=require('../models/token');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const crypto = require("crypto");
require("dotenv").config();

const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};


router.post("/create-user",[
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  
], async (req, res) => {
  try {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword
      
    });

    await user.save();

    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '60d' }; 
    const token = jwt.sign(payload, secret, options);
    
    console.log("Generated Token:", token);

    await Token.create({ userId: user._id, token, expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) });

    return res.json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const payload = { userId: user._id };
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ error: "JWT secret is not configured" });
      }
      const options = { expiresIn: '60d' }; 
      const token = jwt.sign(payload, secret, options);
  
      return res.json({ token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
