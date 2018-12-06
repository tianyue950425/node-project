var express = require('express');
var router = express.Router();
var articleModel = require('../model/article.js')
/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.session.userInfo){
		articleModel.find({
		author:req.session.userInfo.username
		}).then((result)=>{
			res.render('index', { title: 'Express' ,currentUser:req.session.userInfo.username,articleList:result});
		})
		
	}else{
		res.redirect('/login');
	}
 
});
//注销路由
router.get('/logout',function(req,res) {
	req.session.destroy(()=>{
		res.redirect('/login');
	})
})
module.exports = router;
