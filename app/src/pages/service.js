import React,{Component} from 'react';
//  引入样式
import '../styles/public.css';
import '../styles/service.css';

// 定义顶部导航条
const dataAll={
    title:'服务',
    amStyle:'primary'
}

// 引入图片
import img01 from '../images/4_09.png';
import img04 from '../images/4_22.png';
// 引入amazeUI组件
import {
    Container,
    NavBar,
    Group,
    Grid,
    Col,
    TabBar
}from 'amazeui-touch';



class Service extends Component{
    constructor(){
        super();
        this.state={
            'selected':'info'
        }
    }
    // 渲染函数
    render(){
        return(
            <Container fill direction="column">
                {/* 大盒子 */}
                <div className="service">
                    {/* 顶部导航开始 */}
                    <NavBar {...dataAll} />
                    {/* 顶部导航结束 */}
                    {/* 主体内容开始 */}
                    <Container className="service-main">
                        <h5>政务服务</h5>
                        {/* 网格开始 */}
                        <Group className="service-government">
                            <Grid avg={4}>
                                <Col><img src={img01} width="40"/><span>社区党建</span></Col>
                                <Col><img src={img01} width="40"/><span>政府公告</span></Col>
                                <Col><img src={img01} width="40"/><span>政策宣传</span></Col>
                                <Col><img src={img01} width="40"/><span>居民意见</span></Col>
                                <Col><img src={img01} width="40"/><span>办事指南</span></Col>
                                <Col><img src={img01} width="40"/><span>就业创业</span></Col>
                                <Col><img src={img01} width="40"/><span>政策宣传</span></Col>
                            </Grid>
                        </Group>
                        {/* 网格结束 */}
                        {/* 第二段网格开始 */}
                        <h5>生活服务</h5>
                        <Group className="service-government">
                            <Grid avg={4}>
                                <Col><img src={img04} width="40"/><span>社区党建</span></Col>
                                <Col><img src={img04} width="40"/><span>政府公告</span></Col>
                                <Col><img src={img04} width="40"/><span>政策宣传</span></Col>
                                <Col><img src={img04} width="40"/><span>居民意见</span></Col>
                                <Col><img src={img04} width="40"/><span>办事指南</span></Col>
                                <Col><img src={img04} width="40"/><span>就业创业</span></Col>
                                <Col><img src={img04} width="40"/><span>政策宣传</span></Col>
                                <Col><img src={img04} width="40"/><span>小区公告</span></Col>
                                <Col><img src={img04} width="40"/><span>缴费管理</span></Col>
                                <Col><img src={img04} width="40"/><span>家政服务</span></Col>
                                <Col><img src={img04} width="40"/><span>物业服务</span></Col>
                            </Grid>
                        </Group>
                        {/* 第二段网格结束 */}
                    </Container>
                    {/* 主体内容结束 */}
                    </div>
                    {/* 底部导航开始 */}
                    <TabBar amStyle="primary">
                        <TabBar.Item
                        eventKey="home"
                        selected={this.state.selected === 'home'}
                        icon="home"
                        title="首页"
                        />
                        <TabBar.Item
                        selected={this.state.selected === 'gear'}
                        eventKey="gear"
                        icon="gear"
                        title="设置"
                        />
                        <TabBar.Item
                        selected={this.state.selected === 'info'}
                        eventKey="info"
                        icon="info"
                        badge={5}
                        title="信息"
                        />
                        <TabBar.Item
                        selected={this.state.selected === 'person'}
                        eventKey="info"
                        icon="person"
                        title="我的"
                        />
                    </TabBar>
                    {/* 底部导航结束 */}
                
            </Container>
        )
    }
}

// 暴露
export default Service;