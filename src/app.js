const express = require('express');
const expressValidator = require('express-validator');
const path = require('path');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, './app/views'));

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
app.use(express.static(path.join(__dirname, './public')));

//ROUTERS
const index = require('./app/routes/index');
const user = require('./app/routes/user');
const profiles = require('./app/routes/profiles');

app.use(index);
app.use('/user', user);
app.use('/profile', profiles);

app.listen(app.get('port'), () => {
	console.log('Listening on PORT : ', app.get('port'));
});
