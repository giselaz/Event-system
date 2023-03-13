const express = require("express");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const RoleMiddleware = require("../middleware/role.middleware");
const DepartamentController = require("../controllers/departament.controller");
const path = require("path");

route.get("/", DepartamentController.getAllDepartaments);
route.post(
  "/addEvent",
  upload,
  AuthMiddleware.verifyToken,
  EventController.addEvent
);
route.post(
  "/",
  upload,
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkAdmin,
  DepartamentController.postDepartament
);
// get all departments
//get active events
route.get(
  "/:departamentId/events/active-events",
  EventController.getActiveEvents
);
//get event details
route.get("/details/:eventId", EventController.getEventDetails);
route.get("/activeEvents", EventController.getActiveEvents);
route.get("/pastEvents", EventController.getPastEvents);
route.get("/:departamentId/allEvents", EventController.getAllEvents);
route.get(
  "/:eventId/participants",
  AuthMiddleware.verifyToken,
  EventController.getParticipants
);
// route.get("/events/:id/images", EventController.getEventImage);
module.exports = route;
