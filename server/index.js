// import express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({ path: 'var.env' });

db
	.authenticate()
	.then(() => console.log('DB Conectada'))
	.catch(error => console.log(error));

// config express
const app = express();

//  enable pug
app.set('view engine', 'pug');

// add the views
app.set('views', path.join(__dirname, './views'));

// load static public folder
app.use(express.static('public'));

// valid if we are development or production
const config = configs[app.get('env')];

// create a variable for website
app.locals.titulo = config.nombresitio;

// show actual year and generate url
app.use((req, res, next) => {
	// create a new date
	const fecha = new Date();
	res.locals.anioActual = fecha.getFullYear();
	res.locals.ruta = req.path;
	return next();
});

// execute bodyparser
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

// load routes
app.use('/', routes());

// Puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
	console.log('El servidor está funcionando');
});
