const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const recipeRouter = require("./routes/recipe.route.js");
const userRouter = require("./routes/user.route.js");
// const { connect } = require("http2");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db.js");
const app = express();
app.use(express.json());
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/recipes", recipeRouter);
app.use("/users/auth", userRouter);
app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Serve the create recipe page
app.get("/create-recipe", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create-recipe.html"));
});

// Serve all recipes page
app.get("/recipes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "all-recipes.html"));
});

// Serve recipe details page
app.get("/recipe/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "recipe-details.html"));
});


// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
