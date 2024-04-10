const { getAll, create, getOne, remove, update } = require('../controllers/news.controllers');
const express = require('express');

const newsRouter = express.Router();

newsRouter.route('/news')
    .get(getAll)
    .post(create);

newsRouter.route('/news/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = newsRouter;