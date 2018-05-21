const express = require('express');
const router = express.Router();
const userDao = require('../../config/database/dao/userDao');
const passport = require('passport');

userDao.signInAndSignUp(passport);

// LORGIN ROUTE - GET
router.get('/login', (req, res) => {
	if(req.user) res.redirect('/profile');
	else {
		res.render('user', {
			showLogin: true,
			message: req.flash('error_message')
		});
	}
});

//REGISTER ROUTE - GET
router.get('/register', (req, res) => {
	if(req.user) res.redirect('/profile');
	else {
		res.render('user', {
			showRegister: true,
			message: req.flash('error_message')
		});
	}
});

//REGISTER ROUTE - POST
router.post('/register', passport.authenticate('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/user/register',
	failureFlash: true
}));

router.post('/login', passport.authenticate('local.signin', {
	successRedirect: '/profile',
	failureRedirect: '/',
	failureFlash: true
}));

module.exports = router;
