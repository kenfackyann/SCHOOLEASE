const express = require('express');
const route = express.Router();
const univ_controller = require('../controller/univ_controller')

route.get( '/getUniv', univ_controller.getUniversity);

route.post('/addUniv', univ_controller.saveUniversity);

route.put('/updateUniv', univ_controller.updateUniversity);

route.delete('/deleteUniv:id', univ_controller.deleteUniversity);
route.post('/filterUniv', univ_controller.filterUniversity);

module.exports = route