

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require('../models/Contact');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const multer = require('multer');
const mailsender = require("../middleware/mailsender");
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const { documentai } = require("googleapis/build/src/apis/documentai");
const crypto = require('crypto');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust the upload directory as necessary
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

router.post("/create-user", upload.single("document"), [
  body("name").notEmpty(),
  body("mobileNumber").notEmpty().isMobilePhone("any"),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({ min: 8 }),
  body("type").notEmpty().isIn(["investor", "startup", "charity", "artist"])
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { name, mobileNumber, email, password, type ,document} = req.body;
    // const document = req.file ? req.file.path : null;

    if (!document) {
      return res.status(400).json({ error: "Document file is required" });
    }

    // Check for unique mobile number and email
    const existingUserByMobile = await User.findOne({ mobileNumber });
    if (existingUserByMobile) {
      return res.status(400).json({ error: "Mobile number already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const hashedPassword = await bcrypt.hash(password.trim(), 10);
    // Create new user instance
    
    const user = new User({
      name,
      mobileNumber,
      email,
      password: hashedPassword,
      type,
      document
    });
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Password valid after creation:', isValid);
    // Save user data to the database
    await user.save();

    // Generate authentication token
    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '60d' }; // Token expiration time
    const token = jwt.sign(payload, secret, options);

    // Return success response with token
    return res.json({ success: true, token, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email or password not provided");
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Normalized email:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });
    console.log("User query result:", user);

    if (!user) {
      console.log("User not found:", normalizedEmail);
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match",isMatch);
  if (!isMatch) {
    return res.status(400).send("Invalid email or password");
  }

    if (!user.documentVerified) {
      console.log('Document not verified for user:', normalizedEmail);
      return res.status(403).json({ error: "Document not verified. Please wait for verification." });
    }

    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '60d' };
    const token = jwt.sign(payload, secret, options);

    console.log("Login successful for user:", normalizedEmail);
    return res.status(200).json({ success: true, role: user.type, userId: user._id, token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/verify-document/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Update user documentVerified status
    const user = await User.findByIdAndUpdate(userId, { documentVerified: true,documentUnverified: false },{new :true});
    console.log('User after document verification:', user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email to user to notify about document verification
    await mailsender({
      email: user.email,
      name: user.name,
      subject: 'Document Verification Successful',
      html: `<p>Your document has been verified. You can now log in to your account.</p>`
    });

    return res.json({ success: true, message: "Document verified successfully. Email sent to user." });
  } catch (error) {
    console.error("Error verifying document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Unverify user's document
router.post("/unverify-document/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Update user documentVerified status
    const user = await User.findByIdAndUpdate(userId, { documentUnverified: true , documentVerified: false },{new:true});
    console.log('User after document unverification:', user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email to user to notify about document unverification
    await mailsender({
      email: user.email,
      name: user.name,
      subject: 'Document Unverified',
      html: `<p>Your document has been marked as unverified. Please upload the correct documents for verification.</p>`
    });

    return res.json({ success: true, message: "Document unverified successfully. Email sent to user." });
  } catch (error) {
    console.error("Error unverifying document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getuser/:userId", fetchuser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users
router.get("/getallusers", fetchuser, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/getuserdocument/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.document) {
      return res.status(404).json({ message: 'Document not uploaded for this user' });
    }

    // Assuming the document field is already base64 encoded
    res.status(200).json({ document: user.document, contentType: 'application/png' }); // Adjust content type as necessary

  } catch (error) {
    console.error('Error fetching user document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post(
  "/contactus",
  [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('subject').notEmpty(),
    body('message').notEmpty()
  ],
  async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
     const { name, email, subject, message } = req.body;

    
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
      res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the contact form' });
    }
  }
);
module.exports = router;
