 var express = require('express');
var router = express.Router();
var articleModel = require("../model/article");

var multer = require('multer');
var upload = multer({dest:'public/uploads/'})

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.userInfo){
  		res.render('article', { title: 'article',info:{},isnew:true});
  	}else{
  		res.redirect("/login");
 	} 
  
});
router.get('/delete/:id', function(req, res, next) {

	 // articleModel.remove({_id:""})
		articleModel.findByIdAndRemove(req.params.id).then((result)=>{
			res.redirect('/');			
		})	
  	
  
});
router.get('/updata/:id', function(req, res, next) {

	 // articleModel.remove({_id:""})
		articleModel.findById(req.params.id).then((result)=>{
			res.render('article',{title:'article',info:result,isnew:false});			
		})	
  	
  
});
router.post('/updata/:id', upload.array('typhoto'),function(req, res, next) { 
	var oldpath = req.body.oldpath.split(',');
	console.log(oldpath);
	console.log(req.files);//[]
	var filepath = [];
	for(var i=0;i<req.files.length;i++){
		filepath.push('/uploads/' + req.files[i].filename);
    }
    console.log(filepath);
	articleModel.findByIdAndUpdate(req.params.id,{
		title:req.body.title,
		content:req.body.content,
		filepath:req.files.length?filepath : oldpath //存到看不到的name=oldpath的input标签value里提交上来的req.body.oldpath
	}).then((result)=>{
		console.log(result);
		res.redirect('/');
	})
  
});

router.post("/",upload.array('typhoto'),function(req,res){
	console.log(req.files);
	var filepath = [];
	for(var i = 0;i<req.files.length;i++){
		filepath.push('/uploads/' + req.files[i].filename);	
	}
	articleModel.create({
		title:req.body.title,
		content:req.body.content,
		createDate:new Date(),
		author:req.session.userInfo.username,
		filepath:req.files.length? filepath : []//传没传照片传了就设置 没传就设置为空字符
	}).then((result)=>{
		console.log(result);
		res.redirect('/');
	})
 
})
//时间戳 new Date().getTime()


module.exports = router;
