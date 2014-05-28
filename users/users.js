var express = require('express'); 
var router = express.Router(); 
  
 /* GET Hello World page. */
router.get('/userList', function(req, res) { 
    res.render('userList', { title: 'users, World!' }); 
});
