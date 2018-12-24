var mongoose = require('mongoose');

mongoose.connect(`mongodb://user:password1@ds137101.mlab.com:37101/meanapp`,
{useNewUrlParser:true})
.then((db)=>{
  console.log('Database connected');
}).catch((err)=>{
  console.log('Database Connection Failure');
});

module.exports = mongoose;
