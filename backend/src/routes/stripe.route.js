const express = require("express");
const BookingController = require("../controllers/booking.controller");

const router = express.Router();

router.post(
  "/booking-webhook",
  express.raw({ type: "application/json" }),
  BookingController.bookingWebhook
);

module.exports = router;