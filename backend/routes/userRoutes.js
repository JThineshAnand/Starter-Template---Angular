var router = require('express').Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'User Already Exists' })
      }
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      return newUser.save();
    }).then((createdUser) => {
      var token = jwt.sign({
        _id: createdUser._id,
        email: createdUser.email
      }, 'secret',
        { expiresIn: '1h' })
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Error in Signing up' })
    })
});


router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({ message: 'User does not Exist' });
      if (!user.comparePassword(req.body.password))
        return res.status(401).json({ message: 'Invalid Password' });
      var token = jwt.sign({ _id: user._id, email: user.email },
        'secret', { expiresIn: '1h' })
      return res.status(201).json({ token });
    }).catch((err) => {
      return res.status(401).json({ message: 'Error in Logging In' })
    })

});

module.exports = router;
