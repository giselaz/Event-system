const express = require("express");
var route = express.Router();

const RoleController = require("../controllers/role.controller");

route.post("/", RoleController.postRole);
route.get("/all", RoleController.getAllRoles);
route.get("/roleName", RoleController.getRoleByName);

module.exports = route;
