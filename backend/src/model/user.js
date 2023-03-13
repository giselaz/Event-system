const mongoose = require("mongoose");
const localMongoose = require("passport-local-mongoose");
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
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
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
  userRole: {
    type: mongoose.Schema.ObjectId,
    ref: "roles",
    required: true,
    default: "63ea0931adfa3d88e6553286",
  },
  bookings: [{ type: mongoose.Schema.ObjectId, ref: "Booking" }],

  departament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});
// userSchema.set("toJSON", {
//   transform: function (doc, ret) {
//     delete ret.password;
//     return ret;
//   },
// });
const User = mongoose.model("User", userSchema);
module.exports = User;
