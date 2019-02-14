const express = require('express');
const router = express.Router();

/* Controladores */
const nosotrosController = require('../controllers/nosotrosController');
const viajesController = require('../controllers/viajesControllers');
const testimonalesController = require('../controllers/testimonialesControllers');
const homeController = require('../controllers/homeController');

module.exports = function () {
    router.get('/', homeController.getHome);

    router.get('/nosotros', nosotrosController.infoNosotros);

    router.get('/viajes', viajesController.getViajes);

    router.get('/viajes/:id', viajesController.getViaje);

    router.get('/testimoniales', testimonalesController.getTestimoniales);

    router.post('/testimoniales', testimonalesController.saveTestimonial);

    return router;
}