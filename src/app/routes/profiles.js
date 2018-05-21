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
  console.log(req.body)
  let user = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_pass: req.body.user_pass
  }
  console.log(user);
});

module.exports = router;
