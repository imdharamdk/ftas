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

/* Middleware */

app.use(cors());
app.use(express.json());

/* Root */

app.get("/", (req, res) => {
  res.send("FTAS API running successfully 🚀");
});

/* Routes */

app.use("/api/coins", coinRoutes);
app.use("/api/signals", signalRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

/* MongoDB */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});