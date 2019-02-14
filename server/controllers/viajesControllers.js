const Viaje = require('../models/Viajes');

exports.getViajes = async (req, res) => {
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

exports.getViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id);

    res.render('viaje', { viaje });
}