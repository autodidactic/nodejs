var express = require('express'); 
var router = express.Router(); 
var app = express(); 
  
  
/* GET home page. */
router.get('/', function(req, res) { 
    app.render('index.html', { title: 'Express' }); 
}); 
  
/* GET Hello World page. */
router.get('/helloworld', function(req, res) { 
    app.render('helloworld', { title: 'Hello, World!' }); 
}); 
  
module.exports = router; 
