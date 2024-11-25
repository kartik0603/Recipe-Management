const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipeDetails, // New function to handle recipe details view
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controller/recipe.controller.js");
const protect = require("../middleware/auth.middleware.js");
const uploader = require("../middleware/upload_image.middleware.js");

const recipeRouter = express.Router();

recipeRouter.use(protect);

recipeRouter.get("/all", getAllRecipes);
recipeRouter.get("/details/:id", getRecipeDetails);  // Route for viewing recipe details
recipeRouter.post("/create", createRecipe);
recipeRouter.patch("/update/:id", updateRecipe);
recipeRouter.delete("/delete/:id", deleteRecipe);
recipeRouter.get("/search", searchRecipes);
recipeRouter.post("/upload", uploader.single("image"), createRecipe);
recipeRouter.put("/img-update/:id", uploader.single("image"), updateRecipe);

module.exports = recipeRouter;
