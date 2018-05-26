const express = require('express');
const router = express.Router();
const userDao = require('../../config/database/dao/userDao');
const passport = require('passport');

userDao.signInAndSignUp(passport);

// LORGIN ROUTE - GET
router.get('/login', (req, res) => {
	let isUserDeleted = req.session.isUserDeleted;
	if(req.user) res.redirect('/profile');
	else {
		res.render('user', {
			showLogin: true,
			daoError: req.flash('error_message'),
			isUserDeleted
		});
		req.session.isUserDeleted = undefined;
	}
});

//REGISTER ROUTE - GET
router.get('/register', (req, res) => {
	if(req.user) res.redirect('/profile');
	else {
		res.render('user', {
			showRegister: true,
			daoError: req.flash('error_message')
		});
	}
});

//REGISTER ROUTE - POST
router.post('/register', (req, res, next) => {
	req.checkBody('user_name', 'The name must be between 3 - 20 chars!').isLength({min: 3, max: 20});
	req.checkBody('user_name', 'The name must be only letters!').matches('^[a-zA-z ]*$');
	req.checkBody('user_email', 'Enter a valid email!').isEmail();
	req.checkBody('user_pass', 'The password must be min 5 chars!').isLength({min: 5, max: undefined});

	let errors = req.validationErrors();
	if(errors){
		res.render('user', {
			showRegister: true,
			errors,
			formData: {
				user_name: req.body.user_name,
				user_email: req.body.user_email,
				user_pass: req.body.user_pass
			}
		});
	}else next();

}, passport.authenticate('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/user/register',
	failureFlash: true
}));

//LOGIN ROUTE - POST
router.post('/login', (req, res, next) => {
	req.checkBody('user_email', 'Enter a valid email!').isEmail();
	req.checkBody('user_pass', 'The password must be min 5 chars!').isLength({min: 5, max: undefined});

	let errors = req.validationErrors();
	if(errors){
		res.render('user', {
			showLogin: true,
			errors,
			formData: {
				user_email: req.body.user_email,
				user_pass: req.body.user_pass
			}
		});
	}else next();
}, passport.authenticate('local.signin', {
	successRedirect: '/profile',
	failureRedirect: '/user/login',
	failureFlash: true
}));

module.exports = router;
