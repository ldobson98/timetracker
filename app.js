'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const nunjucks = require('nunjucks');

const app = express();

//CONTROLLERS
const indexControllers = require('./controllers/index.js');
const tableController = require('./controllers/table.js');
const apiController = require('./controllers/api.js');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');

//STATIC
app.use('/static', express.static('static'));

// ROUTES
app.get('/', indexControllers.index);
app.get('/table', tableController.table);
app.get('/api/events', apiController.listEvents);
app.get('/api/add', apiController.addEvents);
module.exports = app;

// POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/', indexControllers.index);
