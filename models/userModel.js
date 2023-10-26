const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please Provide a password"],
    trim: true,
    minLength: [8, "Password Should be longer than 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Provide a password"],
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Confirm Password Should be the same as password",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
