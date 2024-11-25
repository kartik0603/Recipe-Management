const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const recipeRouter = require("./routes/recipe.route.js");
const userRouter = require("./routes/user.route.js");
const connectDB = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/recipes", recipeRouter);
app.use("/auth", userRouter);

// Routes for rendering pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/create-recipe", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create-recipe.html"));
});

app.get("/recipes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "all-recipes.html"));
});

app.get("/recipe/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "recipe-details.html"));
});

// Fallback route
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
