const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    isPaid: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    razorpay: {
        orderId: {
            type: String,
            required: true
        },
        paymentId: {
            type: String,
            required: true
        },
        signature: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
