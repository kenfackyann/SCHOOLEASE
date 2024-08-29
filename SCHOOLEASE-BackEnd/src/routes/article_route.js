const express = require('express');
const route = express.Router();
const article_controller = require('../controller/article_controller')

route.post('/addArticle', article_controller.addArticle);

module.exports = route

