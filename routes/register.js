  var express = require('express');
var router = express.Router();

var userModel = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'register' });
});
//post
router.post('/', function(req, res, next) {
  // res.render('register', { title: 'register' });
  //console.log(req.body)
  userModel.create({
  	email:req.body.email,
  	username:req.body.username,
  	password:req.body.password
  }).then(result=>{
		res.redirect("/login");
  }).catch(error=>{

  })
});

module.exports = router;
