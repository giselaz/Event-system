const { required } = require("joi");
const mongoose = require("mongoose");
const localMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  isVerified:{
    type: Boolean,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "organizer","vendor"],
    default: "user",
  },
  userRole: {
    type: mongoose.Schema.ObjectId,
    ref: "roles",
    required: true,
    default: "63ea0931adfa3d88e6553286",
  }, 
  // bookings: [{ type: mongoose.Schema.ObjectId, ref: "Booking",required:true }],

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
});

userSchema.plugin(localMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
