$(function(){
    //获取借款人的默认数据值(通过cookie获取)
    $.get('/users/getCookie',function(data){
        //获取后台传输的cookie（username）
        var username=data.username;
        //给input赋值
        $('#borrowPerson').val(username);
    });

    // 给提交按钮添加时间，发送ajax请求到后台borrow接收,添加到数据库
    $('#borrowSubmit').on('click',function(){
        //表单提交的序列化
        var borrowList=$('#borrowForm').serialize();
        //console.log(borrowList);
        // 表单发送ajax数据到后台路由，使数据库中添加借款数据
         $.post("/borrows/apply",borrowList,function(data){
            //console.log('后台apply路由传输回来的数据',data);
            if(data.isSuccess){
                alert('提交成功!');
                location.href="/loan.html";
            }else{
                alert('提交失败！请核实');
            }
         })
    });



    
});


