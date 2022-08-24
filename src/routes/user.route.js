const express = require('express')
var route = express.Router();
const UserController = require('../controllers/user.controller');
// const RoleMiddleware = require('../middleware/role.middleware')

route.post('/',UserController.addUser)
route.post('/:userId',UserController.setRole);
module.exports =route