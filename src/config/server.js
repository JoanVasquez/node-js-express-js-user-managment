const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressValidator());

module.exports = app;