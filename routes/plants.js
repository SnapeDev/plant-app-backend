const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const authMiddleware = require("../middleware/auth");

// Get all plants
router.get("/", authMiddleware, async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new plant
router.post("/", authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return;
  }

  const { name, needsWatering, imageUrl, lastWatered, wateringFrequency } =
    req.body;

  const plant = new Plant({
    name,
    needsWatering,
    imageUrl,
    lastWatered,
    wateringFrequency,
  });

  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a plant
router.put("/:id", authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return;
  }
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a plant
router.delete("/:id", authMiddleware, async (req, res) => {
  if (!req.user.id) {
    return;
  }
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
