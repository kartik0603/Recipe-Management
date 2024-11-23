const jwt = require("jsonwebtoken");
const User = require("../model/user.schema.js");
require("dotenv").config();

const protect = async (req, res, next) => {
    try {
      // Check for the authorization header and ensure it follows the Bearer schema
      const token =
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") &&
        req.headers.authorization.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "Not Authorized, token missing" });
      }
  
      // Verify the token and attach user to the request object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
  
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please log in again" });
      }
      res.status(401).json({ message: "Not Authorized, token failed", error: error.message });
    }
  };

// Export 
module.exports = protect;