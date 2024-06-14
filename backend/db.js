const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Timeout for server selection, set to 10 seconds
            socketTimeoutMS: 45000, // Timeout for socket connection, set to 45 seconds
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('MongoDB database connection failed:', err.message);
    }
}

module.exports = connectDB;
