

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/OrderSchema");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const OrderSchema = require("../models/OrderSchema");
const CharityCampaign = require("../models/CharityCampaign");
const ArtistProject = require("../models/ArtistProject");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();


router.post("/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount * 100, // Razorpay amount is in paise
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ success: false, msg: "Some error occurred" });
    }
    res.json({ success: true, order, transactionType: req.body.transactionType });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});


router.post("/pay-order", fetchuser, async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      transactionType,
      OrderId,
    } = req.body;

    // Verify the signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = hmac.digest("hex");

    if (razorpaySignature !== digest) {
      return res.status(400).json({ success: false, msg: "Invalid signature" });
    }

    // Check if OrderId is provided
    if (!OrderId) {
      return res.status(400).json({ success: false, msg: "OrderId is required" });
    }

    let project;
    switch (transactionType) {
      case "charity":
        project = await CharityCampaign.findById(OrderId);
        break;
      case "artist":
        project = await ArtistProject.findById(OrderId);
        break;
      default:
        return res.status(400).json({ success: false, msg: "Invalid transaction type" });
    }

    if (!project) {
      return res.status(404).json({ success: false, msg: "Project not found" });
    }

    project.amountRaised.push({ investorId: req.user.userId, amount: parseInt(amount) });

    const totalAmountRaised = project.amountRaised.reduce((sum, inv) => sum + inv.amount, 0);
    if (totalAmountRaised > project.callToAction || totalAmountRaised > project.fundingTargetAmount) {
      return res.status(409).json({ success: false, msg: "You are exceeding the funding amount" });
    }

    await project.save();

    // Create a new order
    const newOrder = new Order({
      isPaid: true,
      amount: parseInt(amount),
      investor_id: req.user.userId,
      transactionType: transactionType,
      transactionId: project._id,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });

    await newOrder.save();

    res.json({
      success: true,
      msg: "Payment was successful",
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = router;
