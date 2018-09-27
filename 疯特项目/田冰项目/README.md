# fengte

> 基于[vue-cli](https://github.com/vuejs/vue-cli)改造的多页SPA开发脚手架  
> `src/entries`目录下的每一个文件夹会被编译成一个同名的html文件。该文件夹中必须有一个`index.ejs`和一个`index.js`文件  
> 默认编译全部入口，也可以通过参数指定编译特定的入口文件夹  



# 环境依赖

### node
去官网下载安装node7.9+版本(8.x版也可以)，windows版会附带npm。这是一个包管理工具，我们会用它来安装下面提到的其它依赖工具

### yarn

```
npm install yarn -g
```
没有npm的话可以直接去[这里](https://yarnpkg.com/en/docs/install)下载yarn安装包

### vue-devtools

可以在控制台查看vue实例的状态的调试工具。
[安装地址](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)
如果控制台不显示，需要检查以下配置
* 网页使用vue.js而不是vue.min.js，或在刚初始化好后设置Vue.config.devtool=true
* 关闭控制台再重新打开

----
















# 常用命令
## 1.开发环境初始化项目
``` bash
yarn
```

----
## 2.开发环境启动项目
``` bash
yarn run dev
```
也可以使用以下命令只编译一个入口
```
yarn run dev -- -e entry1
```

----

## 3.发布到zhaoyuxiang.hk005.qingnianweb.com 
``` bash
yarn run deploy-fe
```
会自动部署到`zhaoyuxiang.hk005.qingnianweb.com 工程名/入口名.html`

----

## 4.发布到svn
``` bash
yarn run build
```
也可以使用以下命令只编译一个入口
``` bash
yarn run build -- -e entry1
```
然后手动拷贝`dist/入口名.html`到svn的`static/spa`对应目录下，并提交

----















# 项目初始化
## 1.修改全局配置
* 修改`config/index.js`中的`dev.port`，并记录在[有道云笔记](http://note.youdao.com/noteshare?id=c3f783b3d8cca3d54fc0c6a7d3cae2d7&sub=0D5DB59F4DEF4CA7B2654D44E00928E1)上
* 修改`package.json`中的`repository.url`


## 2.创建fe.onluxy.com部署文件夹
在`zhaoyuxiang.hk005.qingnianweb.com `项目目录下以`工程名`创建一个文件夹
