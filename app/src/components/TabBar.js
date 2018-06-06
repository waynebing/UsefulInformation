import React,{Component} from 'react';
import { Button } from 'amazeui-touch';
import {
    Container,
    Group,
    TabBar,
    Icon,
    Badge,
    amStyles,
  } from 'amazeui-touch';

  class TabBar extends Comment {
      constructor(){
          super()
          this.state={
            'selected': 'home'
          }
      }
      render(){
          return(
                <TabBar
            amStyle="primary"
            onAction={this.handleClick}
            >
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
            </TabBar>
          )
      }
  };



export default TabBar;