import React from 'react';
import '../styles/login.css'
// 引入ajax
import Ajax from '../components/Ajax';

class Login extends React.Component {
    // 构造函数(修改this指向)
    constructor(){
        super();
        this.state={};//设置默认状态
        this.checkUser=this.checkUser.bind(this);
    }

    // 自定义检查用户名和密码
    checkUser(){
        // console.log(this.refs.username.value);
        // 获取表单的用户名和密码,当作参数传给后端
        var username=this.refs.username.value;
        var password=this.refs.password.value;

        new Ajax('/data.json?username='+username+'&password'+password,function(data){
            // console.log(data.username);
            if(data.length!=0){
                alert("登陆成功！恭喜")
                window.location.href="/#/shop"
            }else{
                alert('登陆失败！请核实')
            }
        });

    }

    render(){
        return(
            <div className="login">
                <section className="login-title">
                    <div className="login-logo">
                        <img src={'../images/logo.jpg'}/>
                    </div>
                    <h3>智&emsp;天&emsp;下</h3>
                </section>
                <form className="login-form">
                    <p>
                        <span className="fa fa-mobile-phone fa-2x"></span>
                        <input type="text" name="username" ref="username" defaultValue="" />
                    </p>
                    <p><span className="fa fa-lock fa-2x"></span><input type="password" name="password" defaultValue="" ref="password" /></p>
                    <p><input onClick={this.checkUser} type="button" value="登录"/></p>
                </form> 
                <p className="forgetPwd">
                    <a href="#" className="forgetPwd-Word">忘记密码?</a>
                </p>
                <p className="landing">
                    <a href="#/register">免费注册</a>
                    <a href="#">游客登陆</a>
                </p>
            </div>
        )
    }
}

export default Login;