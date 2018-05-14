const userDao = require('../../config/database/dao/userDao');
const passport = require('passport');
userDao.saveUser(passport);

module.exports = app => {
	app.get('/', (req, res) => {
		let action = req.query.action;
		if(action){
			if(action == 'register') {
				res.render('index', {
					showRegister: true
				});
			} else if(action == 'login'){
				res.render('index', {
					showLogin: true
				});
			}
		} else {
			res.render('index', {
				showLogin: true
			});
		}
	});

	app.post('/register', passport.authenticate('local.signup', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/home', (req, res) => {
		//console.log(req.user);
		res.render('home', {user: req.user});
	});
}