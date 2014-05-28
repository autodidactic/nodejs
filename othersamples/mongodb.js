var express = require('express'); 
var assert = require('assert'); 
var http = require('http'); 
var app = express(); 
var connect = require('connect'); 
var Db = require('mongodb').Db, 
    MongoClient = require('mongodb').MongoClient, 
    Server = require('mongodb').Server; 
    var db = new Db('test', new Server('localhost', 27017)); 
  var fs = require('fs'); 
    
  var app1= connect() 
  .use(connect.logger('dev')) 
  .use(connect.static('public')) 
  .use(function (req,res){ 
  res.end("connects sample"); 
  }); 
    
  http.createServer(app).listen(3000); 
  app.get('/getangularusers',function(req,res){ 
    
      db.open(function(err,db){ 
      db.createCollection('sample', function(err,collection){ 
        collection.insert([{usr:'aaa'}, {usr:'bbb'}, {usr:'ccc'}], {w:1}, function(err, result) { 
           
          console.log(result); 
          res.end('The list of users will be displayed in console window'+JSON.stringify(result[1])); 
          fs.writeFile('users.txt', JSON.stringify(result), function (err) { 
          if (err) throw err; 
          console.log('It\'s saved!'); 
        }); 
            db.close(); 
        }); 
          
      }); 
      });//db close 
 }); 
  console.log("server running");
