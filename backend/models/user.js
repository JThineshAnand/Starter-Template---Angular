var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name:{
    type:String,required:true
  },
  email:{
    type:String,required:true
  },
  password:{
    type:String,required:true
  }
});


UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
      bcrypt.genSalt(5,function(err,salt){
        if(err)
          return next(err);
        bcrypt.hash(user.password,salt,null,function(err,hash){
          if(err)
            return next(err);
          user.password = hash;
        })
      })
    }
    next();
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password,this.password);
}

var User = mongoose.model('User',UserSchema);

module.exports = User;
