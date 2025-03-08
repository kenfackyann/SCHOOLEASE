
const express = require('express');
const route = express.Router();
const auth_controller = require('../controller/auth_controller')
require('dotenv').config();

route.post('/register',auth_controller.signup);
route.post('/login', auth_controller.signin);
route.put('/updateUser',auth_controller.updateUser);
route.get('/authenticateUsers',auth_controller.authenticateUser, async (req,res) => {
    res.json({success: true, message: "Protected user data", user: req.user });
});
module.exports = route