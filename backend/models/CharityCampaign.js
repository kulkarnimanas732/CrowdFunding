const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');

const InvestorSchema = new Schema({
  investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true }
});

const CharityCampaignSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  patientInfo: {
    type: String,
    required: true
  },
  patientImages: {
    type: String,
    required: true
  },
  socialMediaLinks: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  callToAction: {
    type: Number,
    default: 0
  },
  amountRaised: {
    type: [InvestorSchema],
    default: []
  },
  accountNumber: {
    type: String,
    required: true  
  },
  ifscCode: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CharityCampaign = mongoose.model('CharityCampaign', CharityCampaignSchema);

// Export the CharityCampaign model
module.exports = CharityCampaign;
