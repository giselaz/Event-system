const express = require("express");
var route = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const VendorController = require("../controllers/vendor.controller");
const upload = require("../utils/upload");
var route = express.Router();
const EventController = require("../controllers/event.controller");

//Get events of a vendor
route.get(
  "/:vendorId/events",
  AuthMiddleware.verifyToken,
  EventController.getVendorEvents
);

//create a vendor
route.post(
  "/new",
  upload,
  AuthMiddleware.verifyToken,
  VendorController.createVendor
);
//Get all vendors
route.get('/',VendorController.getAllVendors);

// get vendor logo
route.get('/logo',VendorController.getVendorsImage);

// get users / organizers / speakers of that vendor

module.exports = route;
