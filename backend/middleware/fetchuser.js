const jwt = require("jsonwebtoken");
const User = require("../models/User");
const User1=require("../models/User1")
require('dotenv').config();

const fetchuser = async (req, res, next) => {
    try {
    
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Please authenticate using a valid token" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Authentication Error:", err);
                return res.status(401).json({ error: "Please authenticate using a valid token" });
            }
            if (!decoded || !decoded.userId) {
                return res.status(401).json({ error: "Invalid token format or missing user information" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
