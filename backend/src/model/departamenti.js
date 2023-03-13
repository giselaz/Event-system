const mongoose = require("mongoose");

const DepartamentSchema = new mongoose.Schema({
  emri: {
    type: String,
    required: true,
  },
  pershkrimi: {
    type: String,
  },
});

const departamenti = mongoose.model("Departament", DepartamentSchema);

module.exports = departamenti;
