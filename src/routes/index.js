const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image')

module.exports = app => {
    router.get('/', home.index);
    router.get('/images/:image_id', image.images);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.likes);
    router.post('/images/:image_id/comment', image.comments);
    router.delete('/images/:image_id', image.delete);
    app.use(router);
}