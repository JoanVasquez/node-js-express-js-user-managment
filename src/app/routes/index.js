const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.user) res.redirect('/profile');
  res.render('index');
});

module.exports = router;
