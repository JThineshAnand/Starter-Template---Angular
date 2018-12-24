var jwt = require('jsonwebtoken');
var User = require('../models/user')

module.exports = (req,res,next)=>{
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'secret',function(err,decoded){
      if(err)
        return res.status(401).json({message:'Please login'});
      User.findById(decoded._id).then((user)=>{
        req.user = user;
        next();
      }).catch((err)=>{
        return res.status('400').json({message:'Cannot retrieve User'});
      });
    });

}
