const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/auth");
const router = express.Router();

const authMiddleware = require("../middleware/auth"); // Corrected import
// Register a new user
router.post("/register", registerUser);

router.get("/users", getAllUsers, authMiddleware);

// Login an existing user
router.post("/login", loginUser);

router.delete("/delete/:id", authMiddleware, deleteUser);

// Example of a protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
