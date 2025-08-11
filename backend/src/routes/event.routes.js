const express = require("express");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const RoleMiddleware = require("../middleware/role.middleware");

// add event
route.post(
  "/:vendorId",
  AuthMiddleware.verifyToken,
  upload,
  EventController.addEvent
);

// get events created by user
route.get(
  "/by-user",
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkOrganizer,
  EventController.getEvent
);
//get event image
route.get("/:eventId/image", EventController.getEventImage);
// get event details
route.get("/details/:eventId", EventController.getEventDetails);
// get events by vendor
route.get("/:vendorId", EventController.getVendorEvents);
// get events by category
route.get("/:categoryId", EventController.getCategoryEvents);
// get Participants
route.get(
  "/:eventId/participants",
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkOrganizer,
  EventController.getParticipants
);
// get all events
route.get("/", EventController.getAllEvents);
// get Active events
route.get("/active", EventController.getActiveEvents);

// get Past events

route.get("/past", EventController.getPastEvents);

// updateEvent

route.patch(
  "/:eventId",
  // AuthMiddleware.verifyToken,
  // RoleMiddleware.checkOrganizer,
  EventController.updateEvent
);

// delete event

route.delete(
  "/:eventId",
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkOrganizer,
  EventController.updateEvent
);

module.exports = route;
