const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://plant-app-omega.vercel.app",
      "https://plant-app-backend-5cp1.onrender.com",
      "https://plant-app-git-main-snapedevs-projects.vercel.app",
    ], // Allow only the frontend at localhost:3000
    methods: "GET, POST, PUT, DELETE", // Allow these methods
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true, // Allow these headers
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const authRoutes = require("./routes/auth");
const plantRoutes = require("./routes/plants");
console.log("is this thing on?");
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
