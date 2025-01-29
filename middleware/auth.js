const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Changed to arrow function
  const token = req.headers["authorization"]; // Ensure this is correct
  console.log("auth middleware being hit");
  console.log(token);
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware; // Exporting as default
