import React,{Component} from 'react';

// 引入样式
import '../styles/public.css';
import '../styles/more.css';

import {
    Container,
    Group,
    NavBar,
    List 
} from 'amazeui-touch';

// 定义图片
import img01 from '../images/4_13.png';
import img02 from '../images/4_32.png';
 
// 定义顶部导航条
const dataAll={
    title:'更多服务',
    amStyle:'primary'
}

class More extends Component{
    // 渲染函数
    render(){
        return(
            <Container fill direction="column">
                {/* 大盒子 */}
                <div className="more">
                    {/* 顶部导航条开始 */}
                       <NavBar {...dataAll} leftNav={[{icon: 'left'}]}/>
                    {/* 顶部导航条结束 */}
                    {/* 包含图标的列表开始 */}
                    <Group>
                        <List>
                            <List.Item
                            media={<img src={img01} width="30"/>}
                            title="百度搜索"
                            href="#"
                            />
                            <List.Item
                            media={<img src={img02} width="30"/>}
                            title="天气查询"
                            href="#"
                            />
                            <List.Item
                            media={<img src={img01} width="30"/>}
                            title="快递查询"
                            href="#"
                            />
                            <List.Item
                            media={<img src={img02} width="30"/>}
                            title="在线问诊"
                            href="#"
                            />
                        </List>
                    </Group>
                    {/* 包含图标的列表结束 */}
                </div>
            </Container>
        )
    }
}

// 暴露
export default More;