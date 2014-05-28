var express = require('express'),  
 path = require('path');  
 var dburl = "test";  
 var coll = ["things"];  
 var db = require('mongojs').connect(dburl,coll);  
 var http = require('http');  
 var app = express();  
var routes = require('./routes/index');  
var users = require('./users/users');  
var engines = require('consolidate'); 
 app.engine('html', require('ejs').renderFile); 
  app.set('view engine', 'html'); 
 app.set('views', __dirname + '/views')  
     
    
 var fs = require('fs');  
app.get('/api', function (req, res) {  
    res.send('Ecomm API is running');  
       
});  
  
   
app.use('/', routes);  
app.use('/users', users);  
   
   
 module.exports = app; 
  
   
 // Make our db accessible to our router 
app.use(function(req,res,next){ 
    req.db = db; 
    next(); 
}); 
  
app.get('/insertangularmongouser',function(req,res){ 
console.log("POST: "); 
  res.header("Access-Control-Allow-Origin", "http://localhost"); 
  res.header("Access-Control-Allow-Methods", "GET, POST"); 
  
  fs.readFile('file.json',function(err,contents){ 
    var rawData = contents; 
    rawData.username="newuser"; 
    rawData.email="ss@gmail.com"; 
    rawData.password="newpass"; 
    res.end(contents); 
    newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }] 
   
    db.things.insert(newstuff,function(err, saved){ 
     if(err) console.log('not saved'); 
     else { 
     console.log('saved');   
     } 
    });  
  }); 
    
  }); 
    
  //db.things.remove('',function(){}); 
    
app.get('/getangularusers',function(req,res){ 
res.header("Access-Control-Allow-Origin", "http://localhost"); 
    res.header("Access-Control-Allow-Methods", "GET, POST"); 
    db.things.find('', function(err, users) { 
    if( err || !users) console.log("No users found"); 
    else
    { 
    res.writeHead(200, {'Content-Type': 'application/json'}); 
        str='['; 
        users.forEach( function(user) { 
            str = str + '{ "name" : "' + user.username + '"},' + '{ "email" : "' + user.email + '"},' + '{ "pwd" : "' + user.pwd + '"},' + '\n'; 
               
        }); 
        str = str.trim(); 
        str = str.substring(0,str.length-1); 
        str = str + ']'; 
        res.end( str); 
    } 
    }); 
  
}); 
app.listen(8080);
