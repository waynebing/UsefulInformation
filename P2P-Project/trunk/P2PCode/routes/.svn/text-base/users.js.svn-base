var express = require('express');
var router = express.Router();
var cookie=require('cookie');
// 1.引入mongoose模块
var mongoose=require('mongoose');
// 2.链接数据库
mongoose.connect("mongodb://172.16.8.64:27017/P2P",(err)=>{
  if(err){
    console.error("数据库链接失败！"+err.message);
  }else{
    console.log("数据库链接成功!");
  }
});
// 3.设计数据库的集合骨架
var userSchema=new mongoose.Schema({
  username: String,
  pwd: String,
  email:String,
  mobile:String,
  isActive:Boolean,
  creatDate:Date
});
// 4.得到骨架模型
/*参数1：集合名
参数2：骨架名
参数3：别名*/
var userModel=mongoose.model('users',userSchema,'users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 一、验证注册到数据库
router.post('/join',function(req,res){
  //一、 获得接收的数据
  var username=req.body.username;
  var pwd=req.body.inputPassword1;
  var createDate=new Date().toLocaleString();
  // 5.实例化模型
  var userInstance=new userModel({
    username: username,
    pwd: pwd,
    mobile:'',
    isActive:true,
    creatDate:createDate
  });
  // 6.调用save方法进行保存
  userInstance.save((err)=>{
    //三、返回数据给前端
    if(err){
      console.log(err.message);
      res.json({"isSuccess":false,"msg":"接收数据成功但未写入数据库NO!"+err.message})
    }else{
      res.json({"isSuccess":true,"msg":"接收数据成功并已写入数据库YES!"})
    }
  });
})


  // 二、验证用户登陆
  router.post('/login',function (req,res) {
    // 接收前端发来的值
    var username=req.body.username;
    var pwd=req.body.inputPassword1;
    console.log("前端发到后台的值:",username,pwd);
    // mongoose中查找是否存在
    var findobj={"username":username,"pwd":pwd};
    userModel.find(findobj,function(err,data){
      if(!err){
        console.log("找到的结果:",data);
        if(data.length>0){
            res.cookie("userid",data[0]._id);
            res.cookie("username",username);
           res.json({"isSuccess":true,"message":"登陆成功"})
        }else{
           res.json({"isSuccess":false,"message":"登陆失败"})
        }
      }else{
        throw err;
      }
    })

  });

  // 验证cookie
  //用于后面的获取登陆cookie信息
  router.get('/getCookie',function(req,res){
    var userid=req.cookies.userid;
    var username=req.cookies.username;
    console.log(username);
    if(userid && username){
      res.send({"isTrue":true,"username":username});
    }else{
      res.send({"isTrue":false,"username":null});
    }
  });

  // 清除cookie
  router.get('/clearCookie',function(req,res){
    res.clearCookie('userid');
    res.clearCookie('username');
    res.redirect('/login.html');
  })
 
module.exports = router;
