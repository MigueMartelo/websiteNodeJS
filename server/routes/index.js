const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function() {
    router.get('/', (req, res) => {
        const promises = [];
        promises.push(Viaje.findAll({limit: 3}));
        promises.push(Testimonial.findAll({limit: 3}));

        // pass promise and execute
        const resultado = Promise.all(promises);

        resultado.then(resultado => res.render('index', {
                pagina: 'Próximos Viajes',
                clase: 'home',
                viajes: resultado[0],
                testimoniales: resultado[1]
            }))
            .catch(error => console.log(error));
    });

    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error));
    });

    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error));
    });

    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
            .catch(error => console.log(error));
    });

    router.post('/testimoniales', (req, res) => {
        // valid fields form
        let {nombre, correo, mensaje} = req.body;

        let errores = [];
        if(!nombre){
            errores.push({'mensaje' : 'Agrega tu Nombre'})
        }
        if(!correo){
            errores.push({'mensaje' : 'Agrega tu Correo'})
        }
        if(!mensaje){
            errores.push({'mensaje' : 'Agrega tu Mensaje'})
        }

        // check errores
        if(errores.length > 0) {
            // show error view
            Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales,
                errores,
                nombre,
                correo,
                mensaje
            }));
        } else {
            // save on db
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
        }
    });

    return router;
}