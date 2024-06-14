const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
require("dotenv").config();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/investor", require("./routes/investor"));
app.use("/api/auth1", require("./routes/adminAuthentication"));
app.use("/api/payment", require("./routes/payment"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "index.html")); 
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.listen(5000 || process.env.PORT, () => {
  console.log(`app listening on port ${5000 || process.env.PORT}`);
});