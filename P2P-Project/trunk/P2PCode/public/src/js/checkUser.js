//判断是否登陆的核实功能
$.get("/users/getCookie",function(result){
    //如果接收到的ajax请求为false，那么跳转login.html
    if(!result.isTrue){
        location.href="/login.html";
        //console.log(result);
    }
});