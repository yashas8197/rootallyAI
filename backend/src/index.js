const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/category.model");
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
  await Category.deleteMany({});

  const data = {
    categories: [
      {
        name: "Bench Press",
        description: "Chest exercise",
        sets: 10,
        reps: 10,
        holdTime: 10,
        side: "Left",
        dumbbell: 10,
      },
      {
        name: "Pull Up",
        description: "Back exercise",
        sets: 8,
        reps: 12,
        holdTime: 5,
        side: "Right",
        dumbbell: 0,
      },
      {
        name: "Squat",
        description: "Leg exercise",
        sets: 12,
        reps: 10,
        holdTime: 5,
        side: "Left",
        dumbbell: 20,
      },
      {
        name: "Deadlift",
        description: "Full body exercise",
        sets: 10,
        reps: 8,
        holdTime: 0,
        side: "Right",
        dumbbell: 30,
      },
    ],
  };

  await Category.insertMany(data.categories);
  console.log("Data seeded successfully!");
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

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // await seedData();
});
