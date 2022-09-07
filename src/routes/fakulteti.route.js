const express = require('express');
var route = express.Router();
const AuthMiddleware = require('../middleware/auth.middleware');
const FakultetController =require('../controllers/fakultet.controller');
const upload = require('../utils/upload')
var route = express.Router();
const EventController = require('../controllers/event.controller')


//Create an event 
route.post('/:fakultetId/events',AuthMiddleware.verifyToken,upload,EventController.addEvent)
//Get events by fakultyId
route.post('/:fakultetId/events',AuthMiddleware.verifyToken,upload,EventController.getEventByFacultyId)

//Get event by userId
route.get('/events',AuthMiddleware.verifyToken,EventController.getEvent)
//Get all events
route.get('/events',AuthMiddleware.verifyToken,EventController.getEvent)
//create a Faculty
route.post('/',AuthMiddleware.verifyToken,upload,FakultetController.postFakultet)
//Get all faculties 
route.get('/',FakultetController.getAllFaculties)
// Get event details
route.get('/events/:eventId',EventController.getEventDetails);

module.exports=route;
