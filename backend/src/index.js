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
        name: "Strength",
        subcategories: [
          {
            name: "Upper Body",
            exercises: [
              { name: "Bench Press", description: "Chest exercise" },
              { name: "Pull Up", description: "Back exercise" },
            ],
          },
          {
            name: "Lower Body",
            exercises: [
              { name: "Squat", description: "Leg exercise" },
              { name: "Deadlift", description: "Full body exercise" },
            ],
          },
        ],
      },
      {
        name: "Cardio",
        subcategories: [
          {
            name: "Running",
            exercises: [
              { name: "Sprints", description: "Short distance running" },
              { name: "Marathon", description: "Long distance running" },
            ],
          },
          {
            name: "Cycling",
            exercises: [
              { name: "Road Cycling", description: "Outdoor cycling" },
              { name: "Stationary Bike", description: "Indoor cycling" },
            ],
          },
        ],
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

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category", error });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //   await seedData();
});
