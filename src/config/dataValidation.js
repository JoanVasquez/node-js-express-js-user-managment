
var signUpValidation = req => {
	if(req.body.user_pass != req.body.user_pass_confirm)
		return { pass_match: 'The passwords are not matching!', showRegister: true }
	else {
		req.checkBody('user_name', 'The name must be only letters!').matches('^[a-zA-z ]*$');
		req.checkBody('user_name', 'The name must be from 3 - 20 chars!').isLength({ min : 3, max : 20});
		req.checkBody('user_email', 'Enter a valid email!').isEmail();
		req.checkBody('user_email', 'The email must be from 3 - 20 chars!').isLength({ min : 3, max : 20});
		req.checkBody('user_pass', 'The password must be from 3 - 10 chars').isLength({ min : 3, max : 10 });
		let errors = req.validationErrors();

		if(errors)
			return { errors, showRegister : true }
		else return;
	}
}

module.exports = {
	signUpValidation
}