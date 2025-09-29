const express = require("express");
var route = express.Router();
const UserController = require("../controllers/user.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

route.post("/signup-google/:userRole", UserController.addUserGoogle);
route.post("/signup/", UserController.addUserSimple);
route.patch("/:userId", UserController.setRole);
route.get("/profile", AuthMiddleware.verifyToken, UserController.getUserInfo);
route.get(
  "/profile/getAllBookings",
  AuthMiddleware.verifyToken,
  UserController.getAllBookings
);
route.get(
  "/profile/events",
   AuthMiddleware.verifyToken,
  UserController.getAdminEvents
);
// route.delete("/delete",UserController.deleteUser);
module.exports = route;
