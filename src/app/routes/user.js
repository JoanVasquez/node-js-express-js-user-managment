const userDao = require('../../config/database/dao/userDao');
const passport = require('passport');
userDao.signInAndSignUp(passport);

module.exports = app => {
	app.get('/', (req, res) => {
		if(req.user){
			res.redirect('/home');
			console.log(req.user);
		}else{
			let action = req.query.action;
			if(action == 'register') {
				res.render('index', {
					showRegister: true,
					message: req.flash('error_message')
				});
			} else {
				res.render('index', {
					showLogin: true,
					message: req.flash('error_message')
				});
			}
		}
	});

	app.post('/signUp',  passport.authenticate('local.signup', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.post('/signIn', passport.authenticate('local.signin', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/home', isLoggedIn, (req, res) => {
		userDao.readAllUsers().then((result) => {
			res.render('home', {
				users: result
			});
		}).catch((errorMessage) => {
			console.log(errorMessage);
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
        res.redirect('/');
	});


}

const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) return next();
	res.redirect('/');
}
