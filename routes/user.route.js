const express = require("express");
const path = require("path");
const { register, login } = require("../controller/user.controler.js");

const userRouter = express.Router();

// API Endpoints for User Authentication
userRouter.post("/register", (req, res) => {
  // Register user logic
  register(req, res);
});

userRouter.post("/login", (req, res) => {
  // Login user logic
  login(req, res);
});

// Routes to render HTML pages for registration and login
userRouter.get("/register", (req, res) => {
  const acceptsHTML = req.headers.accept && req.headers.accept.includes("text/html");
  
  if (acceptsHTML) {
    // Send the register page if the client accepts HTML
    return res.sendFile(path.join(__dirname, "..", "views", "register.html"));
  } else {
    // If client expects JSON, send a JSON response
    return res.json({ message: "Please use POST to register." });
  }
});

userRouter.get("/login", (req, res) => {
  const acceptsHTML = req.headers.accept && req.headers.accept.includes("text/html");
  
  if (acceptsHTML) {
    // Send the login page if the client accepts HTML
    return res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  } else {
    // If client expects JSON, send a JSON response
    return res.json({ message: "Please use POST to log in." });
  }
});

module.exports = userRouter;
