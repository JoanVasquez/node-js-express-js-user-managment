const dbConnection = require('../dbConnection');
const queries = require('../queries/queries');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const dataValidation = require('../../dataValidation');

const connection = dbConnection();

//GET ALL OF THE USERS
const readAllUsers = () => {
	return new Promise((resolve, reject) => {
		connection.query(queries.read_user, (err, res) => {
			if(err) reject(err);
			else resolve(JSON.parse(JSON.stringify(res)));
		});
	});
}

const signInAndSignUp = passport => {

	passport.serializeUser((user, done) => {
		done(null, user.user_id);
	});

	passport.deserializeUser((user_id, done) => {
		connection.query(queries.fine_user_by_id, [user_id], (err, res) => {
			if (res.length) done(err, JSON.parse(JSON.stringify(res))[0]);
			else done(null, false, req.flash('error_message', 'Error in the server!'));
		});
	});

	//SIGN UP
	passport.use('local.signup', new LocalStrategy({
		usernameField: 'user_email',
		passwordField: 'user_pass',
		passReqToCallback: true
	}, (req, email, pass, done) => {
		/*let validationErrors = dataValidation.signUpValidation(req);
		if (validationErrors) return done(validationErrors);*/

		connection.query(queries.sign_in_user, [email], (err, res) => {
			if (err) done(null, false, req.flash('error_message', 'Error in the server!'));
			if (res.length) return done(null, false, req.flash('error_message', 'That email is already taken.'));
			bcrypt.genSalt(10, (err, salt) => {
				if (err) done(null, false, req.flash('error_message', 'Error in the server!'));
				bcrypt.hash(pass, salt, (err, hash) => {
					if (err) done(null, false, req.flash('error_message', 'Error in the server!'));
					let user = {
						user_name: req.body.user_name,
						user_email: req.body.user_email,
						user_pass: hash
					}

					connection.query(queries.save_user, user, (err, res) => {
						if (err) return done(null, false, req.flash('error_message', 'Error in the server!'));
						user.user_id = res.insertId;
						return done(null, user);
					});

				});
			});
		});
	}));

	passport.use('local.signin', new LocalStrategy({
		usernameField: 'user_email',
		passwordField: 'user_pass',
		passReqToCallback: true
	}, (req, email, pass, done) => {

		connection.query(queries.sign_in_user, [email], (err, res) => {
			var user = JSON.parse(JSON.stringify(res))[0];

			if (err) done(null, false, req.flash('error_message', 'Error in the server!'));
			if (!res.length) return done(null, false, req.flash('error_message', 'User not found.'));
			bcrypt.compare(pass, user.user_pass, (err, res) => {
				if (err) done(null, false, req.flash('error_message', 'Error in the server!'));
				if (res) return done(null, user);
				return done(null, false, req.flash('error_message', 'Oops! Wrong password.'));
			});
		});
	}));

}

//UPDATE ANY USER
const updateUser = user => {
	return new Promise((resolve, reject) => {
		connection.query(queries.sign_in_user, [user.user_email], (err, res) => {
			if (err) reject('Error in the server!');
			else if(res.length) reject('That email is already taken.');
			bcrypt.genSalt(10, (err, salt) => {
				if (err) reject('Error in the server!');
				bcrypt.hash(user.user_pass, salt, (err, hash) => {
					if (err) reject('Error in the server!');
					connection.query(queries.update_user, [user.user_name, hash, user.user_id], (err, res) => {
						if (err) reject('Error in the server!');
						else resolve(JSON.stringify(res));
					});
				});
			});
		});
	});
}

const deleteUser = userId => {
	return new Promise((resolve, reject) => {
		connection.query(queries.delete_user, [userId], (err, res) => {
			if (err) reject('Error in the server!');
			else resolve(JSON.stringify(res));
		});
	});
}


module.exports = {
	readAllUsers,
	updateUser,
	deleteUser,
	signInAndSignUp
}
