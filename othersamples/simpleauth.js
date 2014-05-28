var express = require('express'); 
var app = express(); 
var auth = require('basic-auth'); 
var connect = require('connect'); 
  
var auth = app.use(connect.basicAuth(function(user,pass,callback){ 
 var result = (user === 'test' && pass === 'pass'); 
callback(null /* error */, result); 
  
})); 
  
app.get('/home',auth,function(req,res){ 
res.send('i am home'); 
}); 
  
console.log("runnin"); 
  
app.listen(8080);
