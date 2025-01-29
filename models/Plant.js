const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  needsWatering: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  lastWatered: {
    type: Date,
  },
  wateringFrequency: {
    type: Number, // Frequency in days
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
