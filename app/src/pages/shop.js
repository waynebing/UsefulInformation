import React,{Component} from 'react';
// 引入购物样式
import '../styles/shop.css';
import '../styles/public.css';

// *引入组件内容*
import {
    Slider,
    Container,
    Group,
    Grid,
    Col,
    List
  } from 'amazeui-touch';

// 轮播插件
const slider=(
    <Slider controls={false} interval={1000}>
        <Slider.Item>
            <img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
        </Slider.Item>

        <Slider.Item>
            <img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
        </Slider.Item>

        <Slider.Item>
            <img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
        </Slider.Item>

        <Slider.Item>
            <img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
        </Slider.Item>
    </Slider>
);

// 定义引入图片
import icon01 from '../images/list1.jpg';
import icon02 from '../images/list2.jpg';
import icon03 from '../images/list3.jpg';
import icon04 from '../images/list4.jpg';
import icon05 from '../images/list5.jpg';
import icon06 from '../images/list6.jpg';
import icon07 from '../images/list7.jpg';
import icon08 from '../images/list8.jpg';
import icon09 from '../images/11.jpg';
import icon10 from '../images/12.jpg';
import icon11 from '../images/13.jpg';

// 定义列表内albums介绍内容
const album={
    title:'全新上架',
    subTitle:'ZARA新品',
    desc:'全新上架的产品，你值得拥有,这是真的,真的.真的.真的.真的.真的.真的.真的.真的.真的.真的.'
}



class Shop extends Component {
    // 构造函数
    constructor(){
        super();
        this.state={
          selected: 'home'
        }
    }
    // 渲染函数
    render(){
        return(
        <Container fill direction="column">
             {/* 大盒子 */}
            <div className="shop">
             {/* 顶部导航 */}
                <header>
                    <span className="shop-title">购物</span>
                    <div className="shop-icon">
                        <a href="#">
                            <span className="fa fa-search"></span>
                        </a>
                    </div>
                </header>
            {/* 主体内容开始 */}
                <Container scrollable>
                {/* 轮播开始 */}
                    {slider}
                {/* 轮播结束 */}

                    {/* 分类导航图标开始 */}
                    <Group className="shop-category-icon">
                        <Grid avg={4}>
                            <Col><img src={icon01} width="50" /><span>外卖</span></Col>
                            <Col><img src={icon02} width="50" /><span>生活超市</span></Col>
                            <Col><img src={icon03} width="50" /><span>团购</span></Col>
                            <Col><img src={icon04} width="50" /><span>周边</span></Col>
                            <Col><img src={icon05} width="50" /><span>热卖</span></Col>
                            <Col><img src={icon06} width="50" /><span>新店推荐</span></Col>
                            <Col><img src={icon07} width="50" /><span>积分商城</span></Col>
                            <Col><img src={icon08} width="50" /><span>活动</span></Col>
                        </Grid>
                    </Group>
                    {/* 分类导航图标结束 */}

                    <Group className="shop-category-adv">
                        <Grid avg={3}>
                            <Col shrink><img src={icon09} /></Col>
                            <Col shrink><img src={icon10} /></Col>
                            <Col shrink><img src={icon11} /></Col>
                        </Grid>
                    </Group>

                    {/* 猜你喜欢开始 */}
                   <h4>猜你喜欢</h4>
                   <Group className="shop-like">
                        <List>
                           <List.Item
                            {...album}
                            media={<img src={icon01} width="80"/>}
                            />
                            <List.Item
                            {...album}
                            media={<img src={icon01} width="80"/>}
                            />
                            <List.Item
                            {...album}
                            media={<img src={icon01} width="80"/>}
                            />
                            <List.Item
                            {...album}
                            media={<img src={icon01} width="80"/>}
                            />
                        </List>
                    </Group>
                    {/* 猜你喜欢结束 */}
                {/* 主体内容结束 */}
                </Container>
            </div>
            
             {/* 底部导航开始 */}
        </Container>
        )
    }
}

export default Shop;