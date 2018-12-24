var router = require('express').Router();
var User = require('../models/user');
var Auth = require('../middlewares/auth');

router.get('', Auth, (req, res, next) => {
  console.log(req.user);
  console.log('Welcome to input routes');
  res.json({ message: 'Authenticated route' });
})

module.exports = router;
