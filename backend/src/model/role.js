const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const role = mongoose.model("role", roleSchema);

module.exports = role;
