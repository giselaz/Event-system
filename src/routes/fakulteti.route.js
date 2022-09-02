const express = require('express');

var route = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const FakultetController =require('../controllers/fakultet.controller');

//create a Faculty
route.post('/',FakultetController.postFakultet)


module.exports=route;
