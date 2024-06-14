const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User" 
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});


tokenSchema.index({ userId: 1 }, { unique: true });


module.exports = mongoose.model("Token", tokenSchema);
