const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emri: {
    type: String,
  },
  mbiemri: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-zA-Z]+\.[a-zA-Z]+@fti+\.edu\.al/,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "pedagog"],
    default: "user",
  },
  ifVerified: {
    type: Boolean,
  },
  resetLink: {
    data: String,
    default: "",
  },
  event: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  fakulteti: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fakultets",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
