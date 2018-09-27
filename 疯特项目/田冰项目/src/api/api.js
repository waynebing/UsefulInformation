/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 2018/4/18 0018
 * Time: 11:13
 *
 */
/* eslint-disable*/
import {allPageloaadServers} from '../common_libs/pageonload'; // 引入PageloadServers 类文件

let NowUrlHostName = window.location.host; // 检测主机是否在生产环境/
let PRODUCTION, ADD_IP; // 生产环境变量，单点登录IP地址
NowUrlHostName === 'wefint.com' || NowUrlHostName === 'www.wefint.com' ?
    (PRODUCTION = 'NOPRODUCTION') && (ADD_IP = 'http://192.168.0.131:9001') :// 'http://115.28.115.6:48080'
    (PRODUCTION = 'NOPRODUCTION') && (ADD_IP = 'http://192.168.0.131:9001'); // 'http://192.168.0.11:48080'
let pageloadServer = allPageloaadServers; // 实例化 pageloadServer
/**
 * 所有与登录相关的API模块
 * @type {{loginHttpGetToken: (function(*=, *=)), loginHttpServer: (function(*=, *=))}}
 */
export let LoginApiHttpServers = {
    /**
     *单点登录获取TOKEN
     * @param param  发送请求的参数
     * @return {Promise}
     */
    loginHttpGetToken: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/admin/login', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, false, false)
    },
    /**
     *单点登录 根据TOken查询用户信息
     * @param param  请求的参数 TOKEN
     * @param sucssfunc 成功返回的1方法
     */
    loginHttpServer: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', ADD_IP + '/sso/find', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, false)
    },

    /**
     *  单点登录 删除用户信息
     * @param param
     * @param sucssfunc
     */
    logoutHttpServer: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('get', ADD_IP + '/sso/delete', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    }
};

/**
 * 所有与注册相关的API 模块
 * @type {{SendVerificationCode: (function(*=, *=))}}
 */
export let registeApiHttpServers = {
    /**
     *
     * @param param
     * @param sucssfunc
     * @constructor
     */
    SendVerificationCode: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/portal/getVirficationCode', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, false)
    },
    RegisterUser: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/portal/registerUser', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, false)
    }
};

/**
 *
 * @type {{GetHotelName: (function(*=, *=))}}
 */
export let mainPannelApiHttpServers = {
    /**
     * 根据TOKEN 获取 客栈名称
     * @param param  参数TOken
     * @param sucssfunc  返回成功方法
     * @constructor
     */
    GetHotelName: (param, sucssfunc) => {  // 单点登录查新用户信息
        return pageloadServer.pageloadAjaxHttp('GET', ADD_IP + '/sso/find', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, false)
    },

    /**
     * 检查是否为老板登录 并检查是否为第一次登录
     * @param param
     * @param sucssfunc
     * @constructor
     */
    CheckIsBoosShowContolr: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('GET', pageloadServer.pageloadUrlConfig('finace') + '//finance/getPasswordStatus', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, false)
    },

    /**
     * 忘记密码后获取图形验证码
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetPossWorldGetVerifyCode: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/getVerifyCode', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 登录金融
     * @param param
     * @param sucssfunc
     * @constructor
     */
    LoginFinace: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/validatePassword', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 注册金融
     * @param param
     * @param sucssfunc
     * @constructor
     */
    RegisteFinace: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/setPassword', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码 检验手机号码 与 图形验证码是否正确
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetValidateVerifyCode: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/validateVerifyCode', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码 点击按钮发送短信验证码
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetPasswordAndSendMSG: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/sendMsg', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码，验证手机验证码是否正确
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetPassworlValidateSmsCode: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/validateSmsCode', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码  获取验证码后 重新设置金融密码
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgerPasswordUpdatePassword: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/updatePassword', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码 检测当前邮箱是否未注册时的邮箱
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetPasswordByEmail: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/iForgetPasswordByEmail', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    },

    /**
     * 忘记密码 并通过邮箱重新设置密码
     * @param param
     * @param sucssfunc
     * @constructor
     */
    ForgetPasswordByEmailAndUpdate: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('finace') + '/finance/updatePassword', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, false, true)
    }
};

export let washLinenApiHttpServers = {

    washLinenAddLaundry: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundry/addLaundry', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    },
    washLinenGetUserOrderStatus: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundry/findLaundryByUserNameAndDate', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    },

    washLinenFindLaundryPriceList: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundryPrice/findLaundryPriceList', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    },
    washLinenUpdateLaundryPriceList: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundry/editLaundry', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    },
    washLinenGetLaundryPriceList: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundryPrice/findLaundryPriceList', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    },
    washLinenGetLaundryHistoryOrder: (param, sucssfunc) => {
        return pageloadServer.pageloadAjaxHttp('POST', pageloadServer.pageloadUrlConfig('register') + '/laundry/myHistoryOrder', param, (err) => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        }, sucssfunc, true, false)
    }
};
