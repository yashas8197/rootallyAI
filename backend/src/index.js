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

    delete categoryData._id;

    const duplicatedCategory = new Category(categoryData);
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

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // await seedData();
});
