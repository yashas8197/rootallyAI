const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
    },
    reps: {
      type: Number,
      required: true,
      min: 1,
    },
    holdTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    side: {
      type: String,
      enum: ["Left", "Right"],
    },
    dumbbell: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
