const express = require("express");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const RoleMiddleware = require("../middleware/role.middleware");
const DepartamentController = require("../controllers/departament.controller");
const path = require("path");

route.get("/", DepartamentController.getAllDepartaments);
route.use(AuthMiddleware.verifyToken, RoleMiddleware.checkAdmin);
route.post("/:departamentId/events", upload, EventController.addEvent);

route.post("/", upload, DepartamentController.postDepartament);
// get all departments

//create event

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
// route.get("/events/:id/images", EventController.getEventImage);
module.exports = route;
