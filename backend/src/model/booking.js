const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "booked",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  total_amount: {
    type: Number,
  },
  transactionid: {
    type: String,
  },
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
