$(function(){
    //配置表单验证插件的参数
	//给哪个表单做验证
	$('#myform')
    //调用validator方法做验证
    .bootstrapValidator({
        message: 'This value is not valid', //全局的表单提示信息
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //验证成功的图标
            invalid: 'glyphicon glyphicon-remove', //验证失败的图标
            validating: 'glyphicon glyphicon-refresh' //ajax验证的等待图标
        },
        //给哪些表单元素做验证
        fields: {
            //用户做验证，使用的是name属性
            username: {
                message: '用户名验证未通过', //局部的提示信息： 优先
                //验证规则
                validators: {
                    //非空验证
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度在6~18位之间'
                    },
                    //正则表达式验证
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能是大小写字母、数字、下划线'
                    }
                }
            }
            ,inputPassword1: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度在6~18位之间'
                    }
                }
            }
            ,inputPassword2: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                    //如何判断两次密码是否一致?
                    identical: {
                        field: 'inputPassword1', //与那个字段进行比较
                        message: '两次输入的密码不一致'
                    }
                }
            }
        }
    })
    //表单前端验证成功后发起AJAX请求到后台
    .on('success.form.bv', function(e) {
        // 因为是发起AJAX请求，所以阻止默认提交表单
        e.preventDefault();
        // 获取表单示例
        var $form = $(e.target);
        // 获取验证插件的示例
        var bv = $form.data('bootstrapValidator');
        
        // 发起AJAX请求提交数据到后台
        /*
        $.post(url,data,successCB,dataType)
        url	必需。规定把请求发送到哪个 URL。
        data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
        successCB(data, textStatus, jqXHR)	可选。请求成功时执行的回调函数。
        dataType	
        可选。规定预期的服务器响应的数据类型。（xml、json、script 或 html）。
        */
        var regUrl="/users/join"; //提交的网址
        var postData=$form.serialize(); //批量接收表单的值并完成拼接
        
        //因为有密码，从安全角度考虑使用post请求
        $.post(regUrl, postData, function(result) {
            //console.log("接收到的数据",result);
            if(result.isSuccess){
                //<span class="glyphicon glyphicon-ok"></span> 注册成功或者<span id="count">10</span>失败的状态<span class="glyphicon glyphicon-remove"></span>
                var num=6;
                var htmlStr='<span class="glyphicon glyphicon-ok"></span>注册成功，等待<span id="count">'+num+'</span>秒跳转到登陆页面';
                $('#registerTips .modal-body').html(htmlStr);
                var timesID=setInterval(function(){
                    var htmlStr='<span class="glyphicon glyphicon-ok"></span>注册成功，等待<span id="count">'+num+'</span>秒跳转到登陆页面';
                    //console.log(htmlStr);
                    $('#registerTips .modal-body').html(htmlStr);
                    num--;
                    if(num==-1){
                        clearInterval(timesID);
                        // 跳转页面
                        location.href="/login.html";
                    }
                },1000)
            }else{
                var htmlStr='<span class="glyphicon glyphicon-remove"></span>注册失败，请核实';
                $('#registerTips .modal-body').html(htmlStr);
            }
            // 不管成功还是失败都要显示模态框
            $('#registerTips').modal('show');
            
        }, 'json');
    });




    //用户登陆验证
	$('#loginform')
    //调用validator方法做验证
    .bootstrapValidator({
        message: 'This value is not valid', //全局的表单提示信息
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //验证成功的图标
            invalid: 'glyphicon glyphicon-remove', //验证失败的图标
            validating: 'glyphicon glyphicon-refresh' //ajax验证的等待图标
        },
        //给哪些表单元素做验证
        fields: {
            //用户做验证，使用的是name属性
            username: {
                message: '用户名验证未通过', //局部的提示信息： 优先
                //验证规则
                validators: {
                    //非空验证
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度在6~18位之间'
                    },
                    //正则表达式验证
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能是大小写字母、数字、下划线'
                    }
                }
            }
            ,inputPassword1: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度在6~18位之间'
                    }
                }
            }
        }
    })
    //表单前端验证成功后发起AJAX请求到后台
    .on('success.form.bv', function(e) {
        // 因为是发起AJAX请求，所以阻止默认提交表单
        e.preventDefault();
        // 获取表单示例
        var $form = $(e.target);
        // 获取验证插件的示例
        var bv = $form.data('bootstrapValidator');
        
        // 发起AJAX请求提交数据到后台
        /*
        $.post(url,data,successCB,dataType)
        url	必需。规定把请求发送到哪个 URL。
        data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
        successCB(data, textStatus, jqXHR)	可选。请求成功时执行的回调函数。
        dataType	
        可选。规定预期的服务器响应的数据类型。（xml、json、script 或 html）。
        */
        var regUrl="/users/login"; //提交的网址
        var postData=$form.serialize(); //批量接收表单的值并完成拼接
        
        //因为有密码，从安全角度考虑使用post请求
        $.post(regUrl, postData, function(result) {
            console.log("接收到的数据",result);
        }, 'json');
    });

})