const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");
const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

const authMiddleware = require("../middleware/auth");

// Example of a protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
