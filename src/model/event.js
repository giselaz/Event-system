const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  emri: {
    type: String,
    required: true,
  },
  pershkrimi: {
    type: String,
  },
  Created_At: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  data_fillimit:{
    type:Date
  },
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  Lloji_Eventit: {
    type: String,
    enum: ["online", "live"],
    required: true,
  },
  numri_max_pjesemarresve: {
    type: Number,
  },
  hyrja: {
    type: Number,
    required: true,
  },
  event_link: {
    type: String,
  },
  imazhi: {
    type: String,
    required:true
  },
  fakulteti: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fakultets",
  },
  pjesemarres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookings",
  }],
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
