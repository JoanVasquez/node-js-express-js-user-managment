const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended : false}));
app.use(expressValidator());
app.use(cookieParse());
app.use(session({
	secret: 'mysecretsessionkey',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;