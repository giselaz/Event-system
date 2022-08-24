const express = require('express')
const upload = require('../utils/upload')
var route = express.Router();
const EventController = require('../controllers/event.controller')
const uploadController = require('../controllers/upload.controller')
const AuthMiddleware = require('../middleware/auth.middleware');


route.get('/',AuthMiddleware.verifyToken,EventController.getEvent)
route.post('/uploads',upload,uploadController.uploadImage)
route.post('/:fakultetId',AuthMiddleware.verifyToken,upload,EventController.addEvent)
module.exports=route;