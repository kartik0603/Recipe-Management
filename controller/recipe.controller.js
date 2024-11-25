const Recipe = require("../model/recipe.schema.js");

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisineType } = req.body;

    // Validation
    if (!title || !ingredients || !instructions || !cuisineType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const recipeData = {
      title,
      ingredients: ingredients.split(","),
      cuisineType,
      image: req.file ? req.file.path : null,
      createdBy: req.user.id,
    };

    const recipe = await Recipe.create(recipeData);

    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating recipe", error: error.message });
  }
};

// Get all recipes

const getAllRecipes = async (req, res) => {
  try {
    // Fetch all recipes and show username and email of creators
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const recipes = await Recipe.find()
      .populate("createdBy", "username email")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ recipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: error.message });
  }
};

const updateRecipe = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Ensure the logged-in user is the creator
      const recipe = await Recipe.findOne({ _id: id, createdBy: req.user.id });
      if (!recipe) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this recipe" });
      }
  
      // Define allowed fields for update
      const allowedUpdates = [
        "title",
        "ingredients",
        "instructions",
        "cuisineType",
        "image"
      ];
  
      const updates = Object.keys(req.body);
  
      // Validate update fields
      const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
      if (!isValidOperation) {
        return res
          .status(400)
          .json({ message: "Invalid update fields. Only allowed fields can be updated." });
      }
  
      // Check if no valid updates were provided
      if (updates.length === 0 && !req.file) {
        return res.status(400).json({ message: "No valid fields provided for update." });
      }
  
      // Update recipe fields from req.body
      Object.assign(recipe, req.body);
  
      // Handle file upload (if image is included)
      if (req.file) {
        recipe.image = req.file.path; // Update the image field
      }
  
      // Save recipe
      await recipe.save();
  
      res.status(200).json({ message: "Recipe updated successfully", recipe });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating recipe", error: error.message });
    }
  };

  // Get recipe details by ID
const getRecipeDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    const recipe = await Recipe.findById(id).populate("createdBy", "username email");
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe details", error: error.message });
  }
};
  

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the recipe only to the logged-in user
    const recipe = await Recipe.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });
    if (!recipe) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe." });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
};

const searchRecipes = async (req, res) => {
  const { cuisineType } = req.query;

  try {
    if (!cuisineType) {
      return res.status(400).json({
        message: "Please provide a cuisine type to search for recipes.",
      });
    }

    // Case-insensitive search
    const recipes = await Recipe.find({
      cuisineType: { $regex: new RegExp(cuisineType, "i") },
    }).populate("createdBy", "username email");

    if (recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for the specified cuisine type." });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching recipes", error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipeDetails,
};
