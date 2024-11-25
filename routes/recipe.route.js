const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const {
  createRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controller/recipe.controller.js");
const protect = require("../middleware/auth.middleware.js");
const uploader = require("../middleware/upload_image.middleware.js");

const recipeRouter = express.Router();

// Middleware to protect all recipe routes
recipeRouter.use(protect);

// API routes
recipeRouter.get("/all", getAllRecipes);
recipeRouter.get("/details/:id", uploader.single("image"),getRecipeDetails);
recipeRouter.post("/create", createRecipe);
recipeRouter.patch("/update/:id", updateRecipe);
recipeRouter.delete("/delete/:id", deleteRecipe);
recipeRouter.get("/search", searchRecipes);
recipeRouter.post("/upload", uploader.single("image"), createRecipe);
recipeRouter.put("/img-update/:id", uploader.single("image"), updateRecipe);

module.exports = recipeRouter;
