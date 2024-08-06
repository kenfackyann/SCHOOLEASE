
const express = require('express');
const route = express.Router();
const auth_controller = require('../controller/auth_controller')

route.post('/register',auth_controller.signup);
route.post('/login', auth_controller.signin);
module.exports = route