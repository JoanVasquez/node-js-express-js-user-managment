const userDao = require('../../config/database/dao/userDao');

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

	app.post('/register', (req, res) => {
		if(req.body.user_pass != req.body.user_pass_confirm){
			res.render('index', {
				pass_match: 'The passwords are not matching!',
				showRegister: true
			});
		}else {

			req.checkBody('user_name', 'The name must be only letters!').matches('^[a-zA-z ]*$');
			req.checkBody('user_name', 'The name must be from 3 - 20 chars!').isLength({ min : 3, max : 20});
			req.checkBody('user_email', 'Enter a valid email!').isEmail();
			req.checkBody('user_email', 'The email must be from 3 - 20 chars!').isLength({ min : 3, max : 20});
			req.checkBody('user_pass', 'The password must be from 3 - 10 chars').isLength({ min : 3, max : 10 });
			let errors = req.validationErrors();
			
			if(errors){
				res.render('index', {
					errors,
					showRegister: true
				});
			}else {
				let user = {
					name : req.body.user_name,
					email : req.body.user_email,
					pass : req.body.user_pass
				}

				userDao.saveUser(user).then((result) => {
					user.id = result.insertId;

					//CONTINUEW WORKING IN HERE LATER
				}).catch((errorMsg) => {
					console.log(errorMsg);
				});
			}

		}
		
	});
}