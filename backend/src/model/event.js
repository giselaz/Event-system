const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  Created_At: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  start_date: {
    type: Date,
    // min: [new Date(), "can't be before now!!"],
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: "true",
  },
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event_type: {
    type: String,
    enum: ["online", "live"],
    required: true,
  },
  max_participants: {
    type: Number,
  },
  fee: {
    type: Number,
    required: true,
  },
  event_link: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  location: {
    name: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
