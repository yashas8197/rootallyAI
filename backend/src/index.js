const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/category.model");
const Combo = require("./models/combo.model");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Seed data
const seedData = async () => {
  await Combo.deleteMany({});

  const comboData = {
    comboName: "Full Body Workout",
    note: "Best for overall fitness",
    DayOfWeek: ["M", "W", "F"],
    exercises: ["6723cf64e421c43a5cf20896", "6723cf69e421c43a5cf20898"],
  };

  await Combo.create(comboData);

  console.log("Combo data seeded successfully!");
};

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/duplicate-category", async (req, res) => {
  try {
    const categoryData = req.body;

    const dataToDuplicate = {
      name: categoryData.name,
      description: categoryData.description,
      side: `${categoryData.side === "Left" ? "Right" : "Left"}`,
      sets: categoryData.sets,
      reps: categoryData.reps,
      holdTime: categoryData.holdTime,
      dumbbell: categoryData.dumbbell,
    };

    delete categoryData._id;

    const duplicatedCategory = new Category(dataToDuplicate);
    await duplicatedCategory.save();

    res.status(201).json(duplicatedCategory);
  } catch (error) {
    console.error("Error duplicating category:", error);
    res.status(500).json({ message: "Failed to duplicate category", error });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      id: deletedCategory._id,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category", error });
  }
});

const handleUpdate = async (id, updateData) => {
  try {
    const updatedExercise = await Category.findByIdAndUpdate(id, updateData);

    if (!updatedExercise) {
      throw new Error("Exercise not found");
    }

    return updatedExercise;
  } catch (error) {
    throw new Error(error.message);
  }
};

app.post("/api/exercises/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedExercise = await handleUpdate(id, updateData);
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(error.message === "Exercise not found" ? 404 : 400).json({
      message: error.message,
    });
  }
});

const handleAdd = async (exerciseData) => {
  try {
    const newExercise = new Category(exerciseData);
    await newExercise.save();
    return newExercise;
  } catch (error) {
    throw new Error(error.message);
  }
};

app.post("/api/exercises", async (req, res) => {
  const exerciseData = req.body;

  try {
    const addedExercise = await handleAdd(exerciseData);
    res.status(201).json(addedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/clear-exercises", async (req, res) => {
  try {
    const result = await Category.deleteMany({});

    res.status(200).json({
      message: "All exercises cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error clearing exercises:", error);
    res.status(500).json({ message: "Failed to clear exercises", error });
  }
});

const addCombo = async (comboData) => {
  const { comboName, note, DayOfWeek, exercises } = comboData;

  const formattedExercises = exercises.map((id) =>
    mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id
  );

  const newComboData = {
    comboName,
    note,
    DayOfWeek,
    exercises: formattedExercises,
  };

  const newCombo = await Combo.create(newComboData);
  return await Combo.findById(newCombo._id).populate("exercises");
};

app.post("/api/combo", async (req, res) => {
  try {
    const newCombo = await addCombo(req.body);
    res.status(201).json({
      message: "Combo created successfully",
      data: newCombo,
    });
  } catch (error) {
    console.error("Error creating combo:", error);
    res.status(500).json({ message: "Failed to create combo", error });
  }
});

app.get("/api/combos", async (req, res) => {
  try {
    const combos = await Combo.find().populate("exercises");
    res.status(200).json({
      message: "Combos retrieved successfully",
      data: combos,
    });
  } catch (error) {
    console.error("Error fetching combos:", error);
    res.status(500).json({ message: "Failed to fetch combos", error });
  }
});

app.delete("/api/combo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCombo = await Combo.findByIdAndDelete(id);

    if (!deletedCombo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    res.status(200).json({
      message: "Combo deleted successfully",
      id: deletedCombo._id,
    });
  } catch (error) {
    console.error("Error deleting combo:", error);
    res.status(500).json({ message: "Failed to delete combo", error });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // await seedData();
});
