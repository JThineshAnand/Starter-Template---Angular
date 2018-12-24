var app = require('./backend/app');

app.listen(3000, function(err){
  if(err)
    console.log('Error in starting server');
  else {
    console.log('Server running at port 3000');
  }
})
