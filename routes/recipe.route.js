const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controller/recipe.controller.js");
const protect = require("../middleware/auth.middleware.js");
const uploader = require("../middleware/upload_image.middleware.js");


const recipeRouter = express.Router();


recipeRouter.use(protect);
recipeRouter.get("/all", getAllRecipes);


recipeRouter.post("/create", createRecipe);
recipeRouter.patch("/update/:id", updateRecipe);
recipeRouter.delete("/delete/:id", deleteRecipe);
recipeRouter.get("/search", searchRecipes);
recipeRouter.post("/upload", uploader.single("image"), createRecipe);
recipeRouter.put("img-update/:id", uploader.single("image"), updateRecipe);


module.exports = recipeRouter;

