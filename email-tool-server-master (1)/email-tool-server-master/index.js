const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./user/userRoutes");
const mailRoutes = require("./mail/mailRoutes");
const authMiddleware = require("./middlwares/authMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/mail", authMiddleware, mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
