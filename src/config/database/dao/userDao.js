const dbConnection = require('../dbConnection');
const queries = require('../queries/queries');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-node');
const dataValidation = require('../../dataValidation');

const connection = dbConnection();

//GET ALL OF THE USERS
const readAllUsers = () => {
	return new Promise((resolve, reject) => {

	});	
}

const saveUser = passport => {

	passport.serializeUser((user, done) => {
		done(null, user.user_id);
	});

	passport.deserializeUser((user_id, done) => {
		connection.query(queries.fine_user_by_id, [user_id], (err, res) => {
			if(res.length) done(err, JSON.parse(JSON.stringify(res))[0]);
			else done(err, false);
		});
	});

	passport.use('local.signup', new LocalStrategy({
		usernameField: 'user_email',
		passwordField: 'user_pass',
		passReqToCallback: true
	}, (req, user_email, user_pass, done) => {
		let validationErrors = dataValidation.signUpValidation(req);
		if(validationErrors) return done(validationErrors);

		connection.query(queries.sign_in_user, [user_email, user_pass], (err, res) => {
			console.log('Sign In res ==> ', res);
			if(err) return done(err);
			if(res.length) return done(null, false);
			else{
				let user = {
					user_name: req.body.user_name,
					user_email: req.body.user_email,
					user_pass: bcrypt.hashSync(req.body.user_pass, bcrypt.genSaltSync(10), null)
				}

				connection.query(queries.save_user, {
					user_name: user.user_name,
					user_email: user.user_email,
					user_pass: bcrypt.hashSync(user.user_pass, bcrypt.genSaltSync(10), null)
				}, (err, res) => {
					console.log('Sign Up Error ==> ', err);
					if(err) return done(err);
					user.user_id = res.insertId;
					return done(null, user);
				});	
			}

		});
	}));
}

//UPDATE ANY USER
const updateUser = user => {
	return new Promise((resolve, reject) => {

	});
}

const deleteUser = userId => {
	return new Promise((resolve, reject) => {

	});
}

const signUser = (email, pass) => {
	return new Promise((resolve, reject) => {
		connection.query(queries.signUser, {
			email,
			pass
		}, (err, res) => {
			if(!err) resolve(res);
			else reject(err);
		});
	});
}

module.exports = {
	readAllUsers,
	saveUser,
	updateUser,
	deleteUser,
	signUser
}
