var express = require('express');
var router = express.Router();
// 1.引入mongoose模块
var mongoose=require('mongoose');
// 2.链接数据库
mongoose.connect("mongodb://172.20.10.4:27017/P2P",(err)=>{
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
  })


 


})

module.exports = router;
