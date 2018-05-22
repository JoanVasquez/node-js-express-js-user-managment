const express = require('express');
const router = express.Router();
const userDao = require('../../config/database/dao/userDao');

//PROFILE - GET
router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}, (req, res) => {
  userDao.readAllUsers().then((result) => {
    res.render('profiles', {
      users: result,
      user: req.user
    });
  }).catch((errorMessage) => {
    console.log(errorMessage);
  });
});

//lOGOUT - PROFILE
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//USER UPDATE - POST
router.post('/update', (req, res) => {
  let user = {
    user_id : req.body.user_id,
    user_name: req.body.user_name,
    user_pass: req.body.user_pass
  }
  userDao.updateUser(user).then((result) => {
    console.log(result);
  }).catch((errorMsg) => {
    console.log(errorMsg);
  });
});

module.exports = router;
