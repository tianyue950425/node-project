var express = require('express');
var router = express.Router();
var acticleModel = require('../model/article');

router.get('/:id', function(req, res, next) {
	//req.params.id
	// articleModel.find({
	//   _id:
	// }) //返回一定数组 result[0]
	//findById 直接就是一个对象
	if(req.session.userInfo){
		acticleModel.findById(req.params.id).then(result=>{
			res.render('detail',{title:'detail',info:result});
		})
	}else{
		res.redirect('/login');
	}
  
});
module.exports = router;