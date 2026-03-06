require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const coinRoutes = require("./routes/coins");
const signalRoutes = require("./routes/signals");
const newsRoutes = require("./routes/news");
const marketRoutes = require("./routes/market");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

const app = express();

/* ------------------- MIDDLEWARE ------------------- */

app.use(cors());

app.use(express.json());

/* ------------------- ROOT ROUTE ------------------- */

app.get("/", (req, res) => {
  res.send("FTAS API running successfully 🚀");
});

/* ------------------- API ROUTES ------------------- */

app.use("/api/coins", coinRoutes);

app.use("/api/signals", signalRoutes);

app.use("/api/news", newsRoutes);

app.use("/api/market", marketRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/payment", paymentRoutes);

/* ------------------- DATABASE ------------------- */

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

/* ------------------- SERVER ------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});