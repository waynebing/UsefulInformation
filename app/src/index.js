import React from 'react';
import ReactDOM from 'react-dom';
// 引入妹子UI
import 'amazeui-touch/dist/amazeui.touch.min.css';
// 引入父组件
import App from './pages/App';
// 引入子组件
import Login from './pages/Login';
import Register from './pages/register';
import Shop from './pages/shop';
import Service from './pages/service';
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
    
    <Route path='/app' component={App}>
        <Route path='/register'  component={Register}  />
        <Route path='/shop'  component={Shop}  />
        <Route path='/service'  component={Service}  />
        <Route path='/more'  component={More}  />
    </Route>
</Router>
, document.getElementById('app')
);


