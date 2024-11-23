const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    image: { type: String },
    instructions: { type: String, required: true },
    cuisineType: {
      type: String,
      enum: [
        "Gujarati",
        "Punjabi",
        "South Indian",
        "North Indian",
        "Chinese",
        "Mexican",
        "American",
      ],
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;


