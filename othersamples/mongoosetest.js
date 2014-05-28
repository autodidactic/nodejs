var mongoose = require('mongoose'); 
  
mongoose.connect("mongodb://localhost:test"); 
  
var Cat = mongoose.model('Cat',{name:String}); 
  
var kitty = new Cat({name:'one moren meowingto'}); 
for(var i=0;i<10;i++){ 
kitty.save(function (err){ 
if(err) 
console.log('meow'); 
 else
 console.log("lets lookfor a mouse"); 
 Cat.find(function(er,res){ 
 console.log(res); 
 }); 
  
}); 
} 
  
  
 Cat.remove(function(err, left){ 
 console.log(left); 
 }); 
  
