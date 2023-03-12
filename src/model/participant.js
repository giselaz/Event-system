const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["i regjistruar", "anulluar"],
    default: "i regjistruar",
  },
});

const participantModel = mongoose.model("Participant", participantSchema);

module.exports = participantModel;
