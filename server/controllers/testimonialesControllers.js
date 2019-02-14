const Testimonial = require('../models/Testimoniales');

exports.getTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.saveTestimonial = async (req, res) => {
    // valid fields form
    let {
        nombre,
        correo,
        mensaje
    } = req.body;

    let errores = [];
    if (!nombre) {
        errores.push({
            'mensaje': 'Agrega tu Nombre'
        })
    }
    if (!correo) {
        errores.push({
            'mensaje': 'Agrega tu Correo'
        })
    }
    if (!mensaje) {
        errores.push({
            'mensaje': 'Agrega tu Mensaje'
        })
    }

    // check errores
    if (errores.length > 0) {
        // show error view
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
            errores,
            nombre,
            correo,
            mensaje
        });
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
}