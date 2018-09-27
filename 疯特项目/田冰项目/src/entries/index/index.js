// 入口文件,直接渲染页面的
import Vue from 'vue';
import debugNotify from 'common_libs/debug_notify';
import httpRequestor from 'common_libs/http_requestor';
import App from './app.vue';


/** *****************全局变量****************** */
window.httpRequestor = httpRequestor;
// 默认请求错误处理
httpRequestor.defaultErrorHandler = (result) => {
    if (window.gDevEnv) {
        debugNotify.showRequestError(result);
    } else {
        console.error(result.message);
    }
    Vue.prototype.$Message.error(result.message)
}

/** ***************全局变量 end****************** */

new Vue(App).$mount('#app');
