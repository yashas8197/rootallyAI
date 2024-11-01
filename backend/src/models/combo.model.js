const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  comboName: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  DayOfWeek: {
    type: [String],
    enum: ["S", "M", "Tu", "W", "T", "F", "Sa"],
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Combo = mongoose.model("Combo", comboSchema);
module.exports = Combo;
