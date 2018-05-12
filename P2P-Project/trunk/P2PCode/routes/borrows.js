// 一、引入express框架
var express = require('express');
var router = express.Router();
var cookie=require('cookie');
// 二、引入mongoose框架
var mongoose=require('mongoose');
// 三、链接数据库
mongoose.connect("mongodb://172.16.8.64:27017/P2P",(err)=>{
  if(err){
    console.error("数据库链接失败！"+err.message);
  }else{
    console.log("数据库链接成功!");
  }
});
/* 
借款金额 borrowMoney   或者  b_money
借款利息 borrowRate
借款期限 borrowTerm
还款方式 repayment
最小投标 minMoney
最大投标 maxMoney
投标奖金 borrowBonus
招标天数 borrowDays
借款标题 borrowTitle
借款描述 borrowDetails

增加的元素：
借款类型： 下拉列表   borrowType
借款日期： 日历可选   borrowDate
借款人： 登录的用户名，只读readonly      borrowPerson

是否通过审核 isPass
通过审核日期 passDatetime
已投资金额 investMoney
是否满标 isComplated 默认值是false，满标时改写为true
*/
// 四、设计数据库的骨架
var borrowSchema=new mongoose.Schema({
    borrowMoney:Number,
    borrowRate:Number,
    borrowTerm:Number,
    repayment:String,
    minMoney:Number,
    maxMoney:Number,
    borrowBonus:Number,
    borrowDays:Number,
    borrowTitle:String,
    borrowDetails:String,
    borrowType:String,
    borrowDate:Date,
    borrowPerson:String,
    isPass:Boolean,
    passDatetime:Date,
    investMoney:Number,
    isComplated:Boolean
});
// 五、得到骨架模型
var borrowModel=mongoose.model('borrows',borrowSchema,'borrows');
// 六、接收前端接收的值
router.post("/apply",(req,res)=>{
    //获取前端序列化传输过来的值
    var borrowMoney=req.body.borrowMoney;
    var borrowRate=req.body.borrowRate;
    var borrowTerm=req.body.borrowTerm;
    var repayment=req.body.repayment;
    var minMoney=req.body.minMoney;
    var maxMoney=req.body.maxMoney;
    var borrowBonus=req.body.borrowBonus;
    var borrowDays=req.body.borrowDays;
    var borrowTitle=req.body.borrowTitle;
    var borrowDetails=req.body.borrowDetails;
    var borrowType=req.body.borrowType;
    var borrowPerson=req.body.borrowPerson;
    var borrowDate=req.body.borrowDate;
    // 七、实例化骨架模型
    //定义通过时间设置年份
    var passDatetime=new Date();
    passDatetime.setFullYear(2050);
    //实例化模型
    var borrowInstance=new borrowModel({
        borrowMoney:borrowMoney,
        borrowRate:borrowRate,
        borrowTerm:borrowTerm,
        repayment:repayment,
        minMoney:minMoney,
        maxMoney:maxMoney,
        borrowBonus:borrowBonus,
        borrowDays:borrowDays,
        borrowTitle:borrowTitle,
        borrowDetails:borrowDetails,
        borrowType:borrowType,
        borrowDate:borrowDate,
        borrowPerson:borrowPerson,
        isPass:false,
        passDatetime:passDatetime.toLocaleString(),
        investMoney:0,
        isComplated:false
    })
    // 八、调用save方法进行保存
    borrowInstance.save((err)=>{
        if(err){
            console.log(err.message);
            res.json({'isSuccess':false,'msg':'接收数据成功但未写入数据库NO!'})
        }else{
           res.json({'isSuccess':true,'msg':'接收数据成功并已写入数据库YES!'}) 
        }
    });
});

// 贷款页面请求数据，后台查询数据路由
router.get("/getList",(req,res)=>{
    // 1.从数据库中查找数据
    borrowModel.find({},function(err,list){
        //如果没有报错那么返回json数组给前端
        if(!err){
            //给即将发送的listJson初始化
            var listJson={
                "total": list.length,//总的数据数
                "list": []//发送的数据为全部
            };
             //前端发送ajax请求后台的get请求
             // getList?pageIndex=1&pageSize=3
            var pageIndex=req.query.pageIndex;//当前页的索引
            var pageSize=parseInt(req.query.pageSize);//每页显示的大小
            var start=pageIndex*pageSize;//记录的开始位置

            //语法：borrowModel.find().skip().limit();
            //按照前端传输的具体页码查找数据
            borrowModel.find({},function(err,pagerData){
                listJson.list=pagerData;
                res.json(listJson);
            }).skip(start).limit(pageSize);

        }else{
            throw err;
            res.send(null);
        }
    })
})




//导出模块化
module.exports = router;



