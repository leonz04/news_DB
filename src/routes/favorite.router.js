const { getAll, create, getOne, remove, update } = require('../controllers/favorite.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const favoriteRouter = express.Router();

favoriteRouter.route('/favorites')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

favoriteRouter.route('/favorites/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = favoriteRouter;