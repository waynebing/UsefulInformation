import React from 'react';
import ReactDOM from 'react-dom';
// 引入妹子UI
import 'amazeui-touch/dist/amazeui.touch.min.css';
// 引入登陆页面
import Login from './pages/Login';
// 引入注册页面
import Register from './pages/register';
// 引入购物页面
import Shop from './pages/shop';
// 引入服务页面
import Service from './pages/service';
// 引入更多服务页面
import More from './pages/more';
// 引入路由
import {Router,Route,hashHistory}from 'react-router';
// 引入字体css文件
import './styles/css/font-awesome.css';



// Render the main component into the dom
ReactDOM.render(
    //声明跳转方式是hash跳转
<Router history={hashHistory}>
    {/* 定义路线 */}
    <Route path='/'  component={Login}  />
    <Route path='/register'  component={Register}  />
    <Route path='/shop'  component={Shop}  />
    <Route path='/service'  component={Service}  />
    <Route path='/more'  component={More}  />
</Router>
, document.getElementById('app')
);


