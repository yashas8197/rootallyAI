const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [exerciseSchema],
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [subcategorySchema],
});

module.exports = mongoose.model("Category", categorySchema);
