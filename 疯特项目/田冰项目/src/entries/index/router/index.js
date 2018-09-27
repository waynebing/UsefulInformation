import VueRouter from 'vue-router'

// 注释里的是分块js名，加user_center_前缀是为避免和某个入口或chunk同名，否则会无法运行
// 登陆路由 模块
// const index = r => import(/* webpackChunkName: "views/index" */'../components/views/index/index.vue').then(r);
// const index = r => import(/* webpackChunkName: "views/login" */'../components/common/index/index').then(r);
// 引入自定义组件
import index from '../components/common/index/index';
import about from '../components/views/about/about';
import header from '../components/views/header/header';

// 任务：导入子组件并分配路径


const routes = [
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/about',
        name: 'about',
        component: about
    },
    {
        path: '/header',
        name: 'header',
        component: header
    }
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: login
    // },
    // {
    //     path: '/mainPannel',
    //     name: 'mainPannel',
    //     component: mainPannel
    // },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: register
    // },
    // {
    //     path: '/setting',
    //     name: 'setting',
    //     component: setting
    // }
//     {
//         path: '/',
//         name: 'frame',
//         component: frame,
//         children: [
//             {
//                 // 初始化定向到match
//                 path: '/',
//                 name: 'match',
//                 components: {
//                     content: match,
//                     right: rightBar
//                 },
//             },
//             {
//                 path: '/match',
//                 name: 'match',
//                 components: {
//                     content: match,
//                     right: rightBar
//                 }
//             },
//             // 必须放最后
//             {path: '/*', name: '404', component: match},
//         ]
//     },

];

// 创建 router 实例
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    },
})

router.afterEach(({to}) => {
    if (!window.gDevEnv) {
        setTimeout(() => {
            try {
                ga('send', 'pageview', to.path)
            } catch (err) {
                console.error(new ReferenceError('ga initialize error'))
            }
        }, 100)
    }
})

export default router;
