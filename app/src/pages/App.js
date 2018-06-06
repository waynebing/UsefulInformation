import React from 'react';

// 引入本地样式
import '../styles/App.css';
// 引入妹子UI组件
import { Container, TabBar } from 'amazeui-touch';

// 引入路由link组件
import { Link } from 'react-router';

// 创建组件
class Shop extends React.Component{
    // 构造函数
    // constructor(){
    //     super();
    //     this.state={
    //         selected:'Shop'
    //     }
    // }
    // 定义上下文路由的类型
    static contextTypes={
        router:React.PropTypes.object.isRequired
    };
    render(){
        const location=this.props.location;
        const children=this.props.children;
        // 获取执行上下文中的路由
        const router = this.context.router;
        return(
            <Container fill direction="column">
                <div className="mainbox">
                {/* 通过子组件进行渲染 */}
                    {/* {this.props.children} */}
                    {React.cloneElement(children,{key:location.key})}
                </div>
                 {/* 底部工具栏 */}
                <TabBar amStyle="primary">
                <TabBar.Item
                    component={Link}
                    selected={router.isActive('/shop',true)}//判断是否激活
                    icon="star-filled"
                    to='/shop'//跳转的链接
                    title="购物"
                />
                <TabBar.Item
                    component={Link}
                    selected={router.isActive('/service',true)}
                    icon="gear"
                    to='/service'//跳转的链接
                    title="服务"
                />
                <TabBar.Item
                    component={Link}
                    selected={router.isActive('/more',true)}
                    icon="info"
                    badge={5}
                    to='/more'//跳转的链接
                    title="更多"
                />
                <TabBar.Item
                    component={Link}
                    selected={router.isActive('/register',true)}
                    icon="person"
                    to='/register'//跳转的链接
                    title="注册"
                />
                </TabBar>
            </Container>
        )
    }
} 

// 暴露
export default Shop;