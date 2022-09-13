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
  start_date:{
    type:String,
    min: [new Date(), "can't be before now!!"],
  },
  end_date:{
    type:String,
    
  },
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
    required:true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fakultets",
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookings",
  }],
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
