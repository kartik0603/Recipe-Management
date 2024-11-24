const express = require("express");
const path = require("path");
require("dotenv").config();

const recipeRouter = require("./routes/recipe.route.js");
const userRouter = require("./routes/user.route.js");
// const { connect } = require("http2");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db.js");

const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/recipes", recipeRouter);
app.use("/users/auth", userRouter);
app.use(express.json());

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
