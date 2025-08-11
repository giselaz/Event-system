const express = require("express");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const RoleMiddleware = require("../middleware/role.middleware");
const CategoryController = require("../controllers/category.controller");
const path = require("path");
const localpassport = require("../middleware/passport.auth.middleware");
// get all categories
route.get("/", CategoryController.getAllCategories);
// add category
route.post(
  "/new",
  upload,
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkAdmin,
  CategoryController.postCategory 
);
route.patch(
  "/:categoryId",
  AuthMiddleware.verifyToken,
  RoleMiddleware.checkAdmin,
  CategoryController.updateCategory
);
// get Category Image
route.get("/logo/:categoryId", CategoryController.getCategoryImage);
module.exports = route;
