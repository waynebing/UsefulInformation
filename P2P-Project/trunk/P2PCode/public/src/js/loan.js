$(function(){
    // 一、页面加载时发ajax请求到后台请求数据
    $.get("/borrows/getList",function(data){
        //console.log('后台传输过来的数据',data);
        // 二、使用数据渲染模板
        var investListJson={
            investList:data
        };
        // 渲染之后的html代码
        var htmlStr=template('loanTmpl',investListJson)
        console.log(htmlStr);
        // 把html更新到页面上
        $('#gridBody').html(htmlStr);
    })
    


})