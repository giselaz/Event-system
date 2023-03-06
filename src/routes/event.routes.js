const express = require("express");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");
const uploadController = require("../controllers/upload.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

route.get("/", AuthMiddleware.verifyToken, EventController.getEvent);
route.get("details/:eventId", EventController.getEventDetails);

route.post(
  "/:fakultetId",
  AuthMiddleware.verifyToken,
  upload,
  EventController.addEvent
);
module.exports = route;
