const express = require("express");
var route = express.Router();
const BookingController = require("../controllers/booking.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

route.post(
  "/bookEvent",
  AuthMiddleware.verifyToken,
  BookingController.createBooking
);
route.post(
  "/onlineEvent",
  AuthMiddleware.verifyToken,
  BookingController.bookOnlineEvent
);

module.exports = route;
