var express = require('express');  
var router = express.Router();  
var app = express();  
var haml = require('haml'); 
  var fs = require('fs');  
 var path = require('path');  
 var dburl = "test";  
 var coll = ["things"];  
 var db = require('mongojs').connect(dburl,coll);  
     
/* GET home page. */
router.get('/', function(req, res) { 
    res.render('index', { title: 'Express' }); 
}); 
  
/* GET Hello World page. */
router.get('/helloworld', function(req, res) { 
        res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With");
  res.header("Access-Control-Allow-Methods","GET, POST");
    res.render('helloworld', { title: 'Hello, World!' }); 
}); 
  
router.post('/adduser', function(req, res,next) {
    res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With");
  res.header("Access-Control-Allow-Methods","GET, POST");
   console.log(req.body.user);
   console.log(req.body.email);
    var first = req.body.user;
    var second = req.body.email;
    res.write("Hello users ");
    res.render('adduser', { title: 'Users,Welcome!'},function(err, html){
        
        res.write(JSON.stringify({user : first}));
        res.write(JSON.stringify({email : second}));
        
        res.end();
    }); 
       
 });
 
  
  router.get('/userList', function(req,res){
      res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With");
  res.header("Access-Control-Allow-Methods","GET, POST");
       res.render('userList', { title: 'Users, World!' }); 
  });
  
  
  router.get('/newuser',function(req,res){
          res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With");
  res.header("Access-Control-Allow-Methods","GET, POST");
     res.render('newuser',{title: 'Add new user'}) ;
  });
     
/* GET Userlist page. */
router.get('/userlist', function(req, res) { 
    res.header("Access-Control-Allow-Origin", "http://localhost"); 
    res.header("Access-Control-Allow-Methods", "*"); 
    db.things.find('', function(err, users) { 
    if( err || !users) console.log("No users found"); 
    else
    { 
    res.writeHead(200, {'Content-Type': 'application/json'}); 
        //str='<!DOCTYPE html><html><head><title>res vs app render</title></head><body> \n'; 
        str = ''; 
        users.forEach( function(user) { 
            str = str + '  <li><a href="' + user.email + '"> '+ user.username + '</a></li>' + '\n'; 
            // haml.render(user.name + user.email); 
        }); 
        str = str.trim(); 
        str = str.substring(0,str.length-1); 
         //str = str + '> \n </body></html>'; 
         str = str + ''; 
        res.end("Rows returned" + str); 
    } 
});  
       
}); 
   
    
  router.get('/newuser',function(req,res){ 
     console.log("POST: "); 
  res.header("Access-Control-Allow-Origin", "http://localhost"); 
  res.header("Access-Control-Allow-Methods", "GET, POST"); 
  
  fs.readFile('file.json',function(err,contents){ 
    var rawData = contents; 
    rawData.username="newuser"; 
    rawData.email="ss@gmail.com"; 
    rawData.password="newpass"; 
    res.end(contents); 
    newstuff = [{ "username" : "shawn", "email" : "shansp@testdomain.com" }, { "username" : "fardeen01", "email" : "fardeen01@testdomain.com" }] 
   
    db.things.insert(newstuff,function(err, saved){ 
     if(err) console.log('not saved'); 
     else { 
     console.log('saved');   
     } 
    });  
  }); 
    
    
  });    
module.exports = router;
