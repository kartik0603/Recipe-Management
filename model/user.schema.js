const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


// Hash the password before saving 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next(); 
    }
  
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next(); 
    } catch (error) {
      next(error);
    }
  });
  
  //compare the entered password with the stored hashed password
  userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error("Error comparing password");
    }
  };
  