/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 18-5-17
 * Time: 上午9:45
 *
 */

/* eslint-disable*/

import {allPageloaadServers} from '../../../common_libs/pageonload'

let NowUrlHostName = window.location.host; // 检测主机是否在生产环境/
let PRODUCTION, ADD_IP; // 生产环境变量，单点登录IP地址
allPageloaadServers.pageLoadPublicStyle();
NowUrlHostName === 'wefint.com' || NowUrlHostName === 'www.wefint.com' ?
    (PRODUCTION = 'ISPRODUCTION') && (ADD_IP = 'http://192.168.0.131:9001') :// 'http://115.28.115.6:48080'
    (PRODUCTION = 'NOPRODUCTION') && (ADD_IP = 'http://192.168.0.145:9001'); // 'http://192.168.0.11:48080'

/**
 * 客栈管理系统
 * @type {{findRegisterUser: (function(*=)), findUserByName: (function(*=)), editUserInfo: (function(*=)), freezeAccount: (function(*=))}}
 */
export let innManageMentApiSercers = {
    findRegisterUser: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/registerUser/findRegisterUser', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    findUserByName: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/registerUser/findUserByName', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    editUserInfo: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/registerUser/editUserInfo', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    freezeAccount: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/registerUser/freezeAccount', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    }
};
/**
 * 房态订单管理
 * @type {{findAllByPage: (function(*=)), findSubOrderByCopyId: (function(*=)), findAllByHotelNameAndPage: (function(*=))}}
 */
export let adminHotelStatusApiServers = {
    findAllByPage: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/edit/findAllByPage', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    findSubOrderByCopyId: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/edit/findSubOrderByCopyId', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    findAllByHotelNameAndPage: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/edit/findAllByHotelNameAndPage', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
};
/**
 * 客栈收益管理
 * @type {{incomeStatisticsData: (function(*=)), incomeStatisticsConditionData: (function(*=))}}
 */
export let incomeStatisticsApiServers = {
    incomeStatisticsData: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/data', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    incomeStatisticsConditionData: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/data/condition', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
};
/**
 * 布草洗涤管理系统
 * @type {{laundryCommonFindByPage: (function(*=)), laundryCommonFindByPageAndCondition: (function(*=)), laundryCommonUpdate: (function(*=)), laundryReceiveReceive: (function(*=)), orderStatisticsCountOrder: (function(*=)), manageLaundryStoreSave: (function(*=)), manageLaundryStoreDelete: (function(*=)), manageLaundryStoreFindByPage: (function(*=)), manageLaundryStoreUpdate: (function(*=))}}
 */
export let adminWashLinenApiServers = {
    /**
     * 分页查询所有布草洗涤订单
     * @param param
     * @returns {Promise.<T>}
     */
    laundryCommonFindByPage: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryCommon/findByPage', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 按条件分页查询所有的洗涤订单
     * @param param
     * @returns {Promise.<T>}
     */
    laundryCommonFindByPageAndCondition: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryCommon/findByPageAndCondition', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },

    /**
     * 更新布草洗涤订单
     * @param param
     * @returns {Promise.<T>}
     */
    laundryCommonUpdate: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryCommon/update', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 商家接单
     * @param param　｛orderNumber，receiveCourier｝
     * @returns {Promise.<T>}
     */
    laundryReceiveReceive: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryReceive/receive', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 根据不同的条件查询洗涤订单数量
     * @param param
     * @returns {Promise.<T>}
     */
    orderStatisticsCountOrder: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/orderStatistics/countOrder', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 添加洗衣店
     * @param param
     * @returns {Promise.<T>}
     */
    manageLaundryStoreSave: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryStore/save', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 删除当前洗衣店
     * @param param
     * @returns {Promise.<T>}
     */
    manageLaundryStoreDelete: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryStore/delete', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 分页查询所有洗衣店
     * @param param
     * @returns {Promise.<T>}
     */
    manageLaundryStoreFindByPage: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryStore/findByPage', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    /**
     * 更新洗衣店
     * @param param
     * @returns {Promise.<T>}
     */
    manageLaundryStoreUpdate: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/laundryStore/update', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
};

export let adminHotelDataRanlingListApiSevers = {
    adminHotelDataSortByOrderCount: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/sort/sortByOrderCount', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    adminHotelDataSortByRoomSells: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/sort/sortByRoomSells', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    },
    adminHotelDatasortByIncome: (param) => {
        return httpRequestor.post(ADD_IP + '/manage/sort/sortByIncome', param).catch(err => {
            console.log('请检查网络环境', err);
            alert('服务器请求失败，请检查网络环境。')
        })
    }
}

