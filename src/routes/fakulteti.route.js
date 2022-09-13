const express = require('express');
const upload = require('../utils/upload')
var route = express.Router();
const EventController = require('../controllers/event.controller')
const AuthMiddleware = require('../middleware/auth.middleware');
const FakultetController =require('../controllers/fakultet.controller');

//create a Faculty
route.post('/',upload,FakultetController.postFakultet)
//create event
route.post('/:fakultetId/events',upload,AuthMiddleware.verifyToken,EventController.addEvent)
//get event details
route.get('/:fakultetId/details/:eventId',EventController.getEventDetails);
module.exports=route;
