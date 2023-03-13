const express = require("express");
var route = express.Router();
const UserController = require("../controllers/user.controller");
const RoleMiddleware = require("../middleware/role.middleware");
const AuthMiddleware = require("../middleware/auth.middleware");

route.post("/signup", UserController.addUser);
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
  RoleMiddleware.checkAdmin,
  UserController.getAdminEvents
);
module.exports = route;
