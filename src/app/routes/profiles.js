const express = require('express');
const router = express.Router();
const userDao = require('../../config/database/dao/userDao');

//PROFILE - GET
router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}, (req, res) => {
  userDao.readAllUsers().then((result) => {
    let isUserUpdated = req.session.isUserUpdated;
    res.render('profiles', {
      users: result,
      user: req.user,
      isUserUpdated
    });
    req.session.isUserUpdated = undefined;
  }).catch((errorMessage) => {
    res.render('/profiles', {
      daoError
    });
  });
});

//lOGOUT - PROFILE
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//PROFILE UPDATE - POST
router.post('/', (req, res, next)=> {
  req.checkBody('user_name', 'The name must be between 3 - 20 chars!').isLength({min: 3, max: 20});
	req.checkBody('user_name', 'The name must be only letters!').matches('^[a-zA-z ]*$');
	req.checkBody('user_pass', 'The password must be min 5 chars!').isLength({min: 5, max: undefined});

	let errors = req.validationErrors();
	if(errors){
		res.render('profiles', {
      errors,
      user: req.user,
			formData: {
				user_name: req.body.user_name,
				user_pass: req.body.user_pass
			}
		});
  }else next();
  
}, (req, res) => {
  let user = {
    user_id : req.body.user_id,
    user_name: req.body.user_name,
    user_pass: req.body.user_pass
  }
  userDao.updateUser(user).then((result) => {
    req.session.isUserUpdated = 'The User was Updated';
    res.redirect('/profile');
  }).catch((daoError) => {
    res.render('profiles', {
      daoError
    });
  });
});


//PROFILE DELETE
router.post('/delete', (req, res) => {
  let userId = req.body.user_id;
  userDao.deleteUser(userId).then((result) => {
    req.session.isUserDeleted = 'The User was deleted!';
    req.logout();
    res.redirect('/');
  }).catch((daoError) => {
    res.render('profiles', {
      daoError
    });
  });
});
module.exports = router;
