<template>
    <div id="app">
        <!-- 渲染出口 -->
        <router-view></router-view>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import util from 'common_libs/util'
    import pageonload from 'common_libs/pageonload';
    import router from './router';
    import store from './store';
    import vTitle from '../../vue_plugins/v_title';


    Vue.prototype.$util = util;// 挂载到全局的公共函数
    Vue.prototype.$PAGELOAD = pageonload;

    Vue.use(VueRouter);
    Vue.use(vTitle);
    // Vue.use(loginView)
    export default {
        name: 'app',
        components: {},
        data() {
            return {}
        },
        created() {
        },
        // 通过 router 配置参数注入路由，从而让整个应用都有路由功能
        router,
        store,
    }
</script>


<!-- 全局样式 -->
<style lang="scss" src="../../common_assets/basic.scss"></style>
<style lang="scss" src="../../common_assets/basic_const.scss"></style>
<style lang="scss" rel="stylesheet/scss">
    #app {
        width: 100%;
        .ivu-auto-complete.ivu-select-dropdown {
            max-height: 300px !important;
        }
        .ivu-tabs-nav {
            padding-left: 40px !important;
        }
        .ivu-tabs-ink-bar {
            left: 40px !important;
        }
    }

</style>
