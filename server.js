const { webcrypto } = require("crypto");
global.crypto = webcrypto;

// require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/todos", require("./routes/todoRoutes"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));