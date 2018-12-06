var express = require('express');
var router = express.Router();

var userModel = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('login', { title: 'login',isShow:false });
});
//post
router.post("/",function(req,res) {
  userModel.find({
    email:req.body.email,
    password:req.body.password
  }).then(result=>{

    if(result.length == 1){
      //开辟有效存储session 的空间 (1. 内存 2. 存文件 3. 数据库)
      //req.sessions[cookieid]  = {}
      req.session.userInfo = result[0];
      
      res.redirect("/");
    }else{
        res.render('login', { title: 'login',isShow:true });
    }

  })
})
module.exports = router;
