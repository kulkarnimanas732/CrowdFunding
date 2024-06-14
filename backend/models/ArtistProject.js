const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvestorSchema = new Schema({
  investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount:{type: Number, required: true}
});

const ArtistProjectSchema = new Schema({
  artistName: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  artistDescription: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  socialMediaLinks: {
    type: String,
    required: true,

  },
  artistVision: {
    type: String,
    required: true
  },
  projectOverview: {
    type: String,
    required: true
  },
  fundingTargetAmount: {
    type: Number,
    required: true
  },
  amountRaised: {
    type: [InvestorSchema],
  default: [] 
},
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const ArtistProject = mongoose.model('ArtistProject', ArtistProjectSchema);

module.exports = ArtistProject;