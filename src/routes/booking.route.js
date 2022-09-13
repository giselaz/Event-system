const express = require('express')
var route = express.Router();
const BookingController = require('../controllers/booking.controller')
const AuthMiddleware = require('../middleware/auth.middleware');

route.post('/',AuthMiddleware.verifyToken,BookingController.createBooking);




module.exports=route;