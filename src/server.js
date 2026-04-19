require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("../routes/authRoutes");
const medicineRoutes = require("../routes/medicineRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // logs method, url, status, response time
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

app.get("/", (req, res) => {
  console.log("GET / called");
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
