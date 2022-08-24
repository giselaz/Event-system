const express = require('express')
var route = express.Router();

const AuthController = require('../controllers/auth.contorller');


route.post('/',AuthController.userLogin);
route.delete('/logout',AuthController.userLogOut)

module.exports =route;