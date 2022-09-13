const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
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
  event: [],
  bookings:[],
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fakultets"
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
