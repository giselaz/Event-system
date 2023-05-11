const mongoose = require("mongoose");
const localMongoose = require("passport-local-mongoose");

const bcrypt = require("bcrypt");

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
  },
  googleId: {
    type: String,
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

userSchema.plugin(localMongoose);
// userSchema.plugin(findOrCreate);
// userSchema.pre("save", async function (next) {
//   const user = this;
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(user.password, salt);
//   this.password = hash;
//   next();
// });
// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// };
const User = mongoose.model("User", userSchema);
module.exports = User;
