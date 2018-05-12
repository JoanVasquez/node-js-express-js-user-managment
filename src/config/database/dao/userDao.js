const dbConnection = require('../dbConnection');
const queries = require('../queries/queries');

const connection = dbConnection();

const readAllUsers = () => {
	return new Promise((resolve, reject) => {

	});	
}

const saveUser = user => {
	return new Promise((resolve, reject) => {
		connection.query(queries.save_user, {
			user_name: user.name,
			user_email: user.email,
			user_pass: user.pass
		}, (err, res) => {
			if(!err) resolve(res);
			else reject(err);
		});
	});
}

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
