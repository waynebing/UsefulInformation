// 引入核心库 
import React from 'react';
import '../styles/register.css';

class Register extends React.Component {
    render(){
        return(
            <div className="register">
                <header className="register-header clear">
                    <span className="register-header-word">注册</span>
                    <div className="register-header-icon">
                       <a href="#"><span className="fa fa-chevron-left"></span></a> 
                    </div>
                </header>
                <form className="register-form">
                    <p><span>片&emsp;&emsp;区</span><input name="area" type="text" placeholder="泸州政法委"/></p>
                    <p><span>手&nbsp;机&nbsp;号</span><input name="area" type="text" placeholder="请输入手机号"/></p>
                    <p><span>密&emsp;&emsp;码</span><input name="area" type="text" placeholder="请输入密码"/></p>
                    <p><span>确认密码</span><input name="area" type="text" placeholder="请输入确认密码"/></p>
                    <p><span>验&nbsp;证&nbsp;码</span><input name="area" type="text" placeholder="请输入验证码"/><a href="#">获取验证码</a></p>
                    <p className="agreement"><span className="fa fa-check-square fa-2x"></span>同意接受智慧社区Life使用协议</p>
                    <p className="submit"><input type="button" value="下一步"/></p>
                </form> 

            </div>
        )
    }
}

// 暴露
export default Register;
