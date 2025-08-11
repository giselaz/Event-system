const express = require("express");
var route = express.Router();
const AuthController = require("../controllers/auth.contorller");
const AuthMiddleware = require("../middleware/auth.middleware");
const UserController = require("../controllers/user.controller");

route.post("/login", AuthController.userLogin);
route.delete("/logout", AuthController.userLogOut);
route.get("/getUser", AuthMiddleware.authenticated, (req, res) =>
  res.send(req.user)
);
module.exports = route;
