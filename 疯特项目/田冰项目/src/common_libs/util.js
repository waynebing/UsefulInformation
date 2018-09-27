import {get as _get} from 'lodash'

/* eslint-disable*/
/**
 * 提供在所有页面都可以使用的通用的方法
 */
export default {
    trimAll,
    addZero,
    getThisWeekNum,
    formatDate,
    onlyNum,
    closeWin,
    targetSelf,
    loadJS,
    formatStamp,
    timeStampTransformation,
    $,
    continueDays,
    getDiffrenceDateList,
    isEmptyObject,
    pageloadCheckNavigator,
    getBrowserVersion,
    getUrlQuery,
    isSameArray,
    safeHtml,
    checkParams,
    testResponseCode,
    // 利用getter和setter访问sessionStorage，支持直接读写object。这里的取值表示是否在读取过一次后就删除
    sessionStorage:
        initStorage(sessionStorage, {
            // OO页面向XX页面传递的数据
            XX_DATA_FOMR_OO_PAGE: true,
        }),
    // 利用getter和setter访问localStorage，支持直接读写object。这里的取值表示是否在读取过一次后就删除
    localStorage:
        initStorage(localStorage, {
            // XX页面用户输入的草稿内容
            XX_PAGE_DRAFT: false,
        }),
}
;

/**
 * 初始化storage代理
 * @param {Storage} stub
 * @param {object} proxy
 */
function initStorage(stub, proxy) {
    const result = {}
    for (const key in proxy) {
        if (proxy.hasOwnProperty(key)) {
            // 必须放进函数调用，以利用闭包固化key
            redefineKey(key, proxy[key]);
        }
    }
    return result;

    function redefineKey(key, isOneshot) {
        Object.defineProperty(result, key, {
            get() {
                const realKey = `SPA_${key}${window.gDevEnv ? '_dev' : ''}`;
                let value = stub.getItem(realKey);
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    if (e.name === 'SyntaxError') {
                        console.error(`can't parse [${realKey}]: ${value}`);
                        stub.removeItem(realKey);
                    } else {
                        console.error(e)
                    }
                    value = undefined;
                }
                if (isOneshot) {
                    stub.removeItem(realKey);
                }
                return value;
            },
            set(value) {
                const realKey = `SPA_${key}${window.gDevEnv ? '_dev' : ''}`;
                if (value === undefined) {
                    // 删除
                    try {
                        stub.removeItem(realKey)
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    try {
                        stub.setItem(realKey, JSON.stringify(value));
                    } catch (e) {
                        if (e.name === 'QuotaExceededError' && stub.length) {
                            // 空间不足
                            stub.clear();
                            stub.setItem(realKey, JSON.stringify(value));
                        } else {
                            console.error(e)
                        }
                    }
                }
            }
        });
    }
}

/**
 * 删除所有空格
 * @param {string} str
 * @return {string}
 */
export function trimAll(str) {
    return str.replace(/\s/g, '')
}

/**
 * 检测当前请求错误后失败的原因
 * @param e
 * @returns {*}
 */
export function pageloadCheckNavigator(e) {
    return window.navigator.onLine ? console.log('网络连接正常') : alert(`网络连接异常，请重新检查网络连接${error}`);
}

/**
 * 小于10，补0函数，常用于时间结构
 * @param {number} num
 * @return {string}
 */
export function addZero(num) {
    return num < 10 ? `0${num}` : num
}

export function getThisWeekNum(thisTime) {
    let week = new Date(thisTime).getDay();
    let str = '';
    switch (week) {
        case 0 :
            str += "日";
            break;
        case 1 :
            str += "一";
            break;
        case 2 :
            str += "二";
            break;
        case 3 :
            str += "三";
            break;
        case 4 :
            str += "四";
            break;
        case 5 :
            str += "五";
            break;
        case 6 :
            str += "六";
            break;
    }
    return str;
}

export function formatDate(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

/**
 * 去除非数字字符
 * @param {string} str
 * @return {string}
 */
export function onlyNum(str) {
    return str ? str.replace(/\D/ig, '') : str
}

/**
 * 关闭当前标签页
 */
export function closeWin() {
    window.opener = null
    window.open('', '_self')
    window.close()
}

/**
 * 在当前页面跳转，external是否为外部域名
 * @param {string} url
 * @param {boolean?} external
 */
export function targetSelf(url, external = false) {
    if (external) {
        window.top.location.href = url
    } else {
        window.top.location.href = `${window.location.protocol}//${window.location.host}${url}`
    }
}

/**
 * 异步加载js，id属性防止重复加载
 * @param {string} url
 * @param {string?} id
 */
export function loadJS(url, id) {
    if (document.getElementById(id)) {
        return
    }
    const fjs = document.getElementsByTagName('script')[0]
    const js = document.createElement('script')
    if (id) {
        js.id = id
    }
    js.src = url
    fjs.parentNode.insertBefore(js, fjs)
}

/**
 * 时间戳转世界时间
 * @param {number} time
 * @param {string} format 时间格式字符串 "yyyy-MM-dd EEE hh:mm:ss"
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @return {string}
 * @example
 * "yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423
 * "yyyy-M-d h:m:s.S"      ==> 2006-7-2 8:9:4.18
 */
export function formatStamp(time, format) {
    format = format === null ? 'yyyy/MM/dd hh:mm' : format
    const date = new Date()
    date.setTime(time * 1000)
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
    return format
}


export function timeStampTransformation(time,format) {
    if(format === 'date'){
        format = new Date(time).setDate(new Date(time).getDate())/1000/60/60/24;
    }else{
        format = new Date(time).setDate(new Date(time).getDate());
    }
    return format
}
/**
 * 获取Dom元素
 * @param {string}
 */
export const $ = document.querySelector.bind(document)

/**
 * 检测一个对象是否是空对象
 * @param {object} obj
 * @return {boolean}
 */
export function isEmptyObject(obj) {
    for (const key in obj) {
        // 如果obj是Object.create(null)创建出来的，就没有prototype，也没有hasOwnProperty
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

/**
 * 根據一條時間集合，依次分割每段連續時間 成爲單獨的集合並返回給原來的集合
 * @param arr
 * @returns {*}
 * @param replaceObj
 */
export function getDiffrenceDateList(arr,replaceObj) {
    let contentList = [];
    let replaceObjContent = [];
    contentList.push(arr[0]);replaceObjContent.push(replaceObj[0]);
    for (let i = 0; i < arr.length; i++) {
        let contentListFirstTime = new Date(contentList[i]).setDate(new Date(contentList[i]).getDate()) / 1000 / 60 / 60 / 24;
        let arrNowTime = new Date(arr[i + 1]).setDate(new Date(arr[i + 1]).getDate()) / 1000 / 60 / 60 / 24;
        if (contentListFirstTime + 1 === arrNowTime) {
            arr[i + 1] !== undefined ? contentList.push(arr[i + 1]) : false;
            replaceObj[i+1] !== undefined ? replaceObjContent.push(replaceObj[i+1]):false;
        } else {
            arr.splice(0, i + 1);replaceObj.splice(0,i+1);
            getDiffrenceDateList(arr,replaceObj);
        }
    }
    contentList[0] !== undefined ? arr.push(contentList) : false;
    replaceObjContent[0]!==undefined ? replaceObj.push(replaceObjContent):false;
    return replaceObj;
}
/**
 * 根據一條時間集合，依次按照时间顺序升续方式排序
 * @param arr
 * @returns {*}
 */
export function forwardRankingOfTimeSet(arr){
    arr.sort((a, b) => {
        if(a < b){
            return -1;
        }else if(a>b){
            return 1;
        }
        return 0;
    });
}
/*
 * 设备检测
 * @return {{isIos:Function, isAndroid:Function}}
 */
export function getBrowserVersion() {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    const uaInfo = {
        ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua),
        android: /Android/i.test(ua) || /Linux/i.test(ua)
    }
    return {
        isIos() {
            return uaInfo.ios
        },
        isAndroid() {
            return uaInfo.android
        }
    }
}

/**
 * 获取url中的指定参数
 * @param   {string} name url中的参数名字
 * @param   {string?} url 不填则使用当前地址
 * @returns {null | string} 若获取失败则返回null
 */
export function getUrlQuery(name, url) {
    const matcher = (url || window.location.search).match(`${name}=([^&#]+)`);
    if (!matcher || matcher.length < 2) {
        console.log(`No "${name}" in url`);
        return null;
    }
    return matcher[1];
}

/**
 * 比较两个数组是否相同
 * @param {Array} array1
 * @param {Array} array2
 * @param {Function} [comparator] 数组元素的比较器，传入参数为两个元素值，返回boolean
 */
export function isSameArray(array1, array2, comparator) {
    if (array1.length !== array2.length) {
        return false
    } else if (!array1.length) {
        return true
    }
    if (comparator) {
        return array1.every(item1 => array2.some(item2 => comparator(item1, item2)))
    } else {
        return array1.every(item => array2.includes(item))
    }
}

export function continueDays(arr_days) {
    // 先排序，然后转时间戳
    let days = arr_days.sort().map((d, i) => {
        let dt = new Date(d)
        dt.setDate(dt.getDate() + 4 - i) // 处理为相同日期
        // 抹去 时 分 秒 毫秒
        dt.setHours(0)
        dt.setMinutes(0)
        dt.setSeconds(0)
        dt.setMilliseconds(0)
        return +dt
    })
    let ret = days
    days.forEach(d => {
        if (days[0] !== d) {
            ret = false
        }
    })
    return days
}

/**
 * 对用户输入的字符串进行转义，防止xss攻击。需要用v-html方式显示的用户内容一定要调用此方法
 * @param {string} str
 */
export function safeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\r\n|\n)/g, '<br>')
}

/**
 * 检查obj对象的成员类型
 * @param {object} obj 待检查的对象
 * @param {object} paramMaps obj中要检查的成员名和成员类型字符串的映射表。
 *                          类型值为'undefined','number','array'等，末尾加问号表示该参数可选
 * @param {string?} objDisplayName 打印错误日志时用的obj名字
 * @returns {boolean} 是否全部合格
 *
 * @example
 * checkParams(obj, {title:'string', 'school.name':'string', books:'array', 'remark', 'string?'}
 */
export function checkParams(obj, paramMaps, objDisplayName = 'obj') {
    if (obj === undefined) {
        console.error(`${objDisplayName} is undefined`)
        return false
    }
    const allType = ['undefined', 'object', 'boolean', 'number', 'string', 'function', 'symbol', 'array']
    return Object.entries(paramMaps).every(([field, type]) => {
        // 检查type参数
        if (typeof type !== 'string') {
            console.error(`type is ${type}, expect one of ${JSON.stringify(allType)}`)
            return false
        }
        const optional = /\w+\?/.test(type)
        if (optional) {
            type = type.slice(0, -1)
        }
        if (!allType.includes(type.toLowerCase())) {
            console.error(`type is ${type}, expect one of ${JSON.stringify(allType)}`)
            return false
        }
        type = type.toLowerCase()

        // 检查obj中对应属性的取值
        const value = _get(obj, field)
        if (optional && value === undefined) {
            return true
        }
        if (type === 'array') {
            if (!Array.isArray(value)) {
                console.error(`${objDisplayName}.${field} is ${value}, expect a ${type}`)
                return false
            }
        } else if (typeof value !== type) { // eslint-disable-line valid-typeof
            console.error(`${objDisplayName}.${field} is ${value}, expect a ${type}`)
            return false
        }
        return true
    })
}

/**
 * 检测每个请求返回体中的code码 并执行对应code码的操作
 * @returns {boolean}
 */
export function testResponseCode(statusCode) {
    let STATUSCODEOBJECT = {
        SUCCESSFULUSERLOGIN: { // 登录 操作 成功
            code: '000000',
            func: () => {
                console.log('操作成功。');
            }
        },
        NOMESSEGESUCCESSFULUSERLOGIN: { // 登录 操作 成功
            code: '900006',
            func: () => {
                console.log('无消息体。');
            }
        },
        ERRORFULUSERLOGIN: {
            code: '999999',
            func: () => {
                alert('验证码错误，请重新输入验证码')
            }
        },
        USERMOBILEPHONETESTERROR: {
            code: 'B000001',
            func: () => {
                alert('对不起，您输入的手机号码与注册时输入的手机号码不符。')
            }
        },
        FORGETFINANCEPASSWORDANDEMAIL: {
            code: 'B000000',
            func: () => {
                alert('对不起，您输入的邮箱地址与注册时的邮箱地址不符，请重新输入。')
            }
        },
        SendMSGTHANMORE: {
            code: '300021',
            func: () => {
                alert('对不起，你发送短信的次数过于频繁，请稍后重试。')
            }
        },
        USERDOESNOTEXIST: {  // 用户不存在;
            code: '100502',
            func: () => {
                alert('查询的用户不存在。');
            }

        },
        WRONGPASSWORD: { // 密码错误；
            code: '100503',
            func: () => {
                alert('输入的密码有误，请重新输入。');
            }
        },
        INVALIDLOGIN: { // 无效登录
            code: '100003',
            func: () => {
                alert('账户已被冻结，请联系管理员。');
                window.location.href = './login.html';
            }
        },
        PARAMETERCANNOTBEEMPTY: { // 请求的参数不能为空
            code: '100501',
            func: () => {
                alert('请求的参数不能为空，请重新输入。');
            }
        },
        INVOKINGSERVICEERROR: { // 请求的参数不能为空
            code: '900010',
            func: () => {
                alert('对不起，调用服务失败，请联系管理员。');
            }
        },
        USERALREADYEXISTS: { // 用户已经存在
            code: '200101',
            func: () => {
                alert('用户名已经被注册，请重新输入用户名。');
            }
        },
        USERPHONENUMBEREROOR: {
            code: '200501',
            func: () => {
                alert('用户手机号码输入有误，请重新输入。');
            }
        },

        VERIFICATIONCODESENDEROOR: {
            code: '200502',
            func: () => {
                alert('短信验证码发送失败，请点击重新发送。');
            }
        },
        VERIFICATIONCODEINVALIDE: {
            code: '200503',
            func: () => {
                alert('短信验证码已经失效，请点击重新发送。');
            }
        },
        VERIFICATIONCODESENTTHANMAX: {
            code: '200505',
            func: () => {
                alert('当日短信验证码发送数量已达上限 。');
            }
        },
        VERIFICATIONCODESENTTHANMAXDATE: {
            code: '300201',
            func: () => {
                alert('当日短信验证码发送数量已达上限 。');
            }
        },
        VERIFICATIONCODEERROR: {
            code: '200500',
            func: () => {
                alert('短信验证码错误，请重新输入验证码。');
            }
        },
        INSUFFICIENTPRIVILEGE: { // 权限不够
            code: '200102',
            func: () => {
                alert('当前权限不够，请联系管理员。');
            }
        },
        DATAALREADYEXISTS: { // 业务数据已经存在
            code: '200103',
            func: () => {
                alert('业务数据已存在，请重新录入。');
            }
        },
        TIMEFORMATERROR: { // 时间格式错误
            code: '200104',
            func: () => {
                alert('时间格式有误，请重新录入时间。');
            }
        },
        DONTHAVEMESSAGE: { // 无业务数据
            code: '200106',
            func: () => {
                alert('查无此业务数据，请重新输入查询条件。');
            }
        },
        ROOMOCCUPANCYCONFLICT: { // 用户入住情况冲突
            code: '200105',
            func: () => {
                alert('用户入住情况重冲突，请重新选择入住时间。');
            }
        },
        NOTOUTOFTIME: {//输入预定天数超时（超过30天）
            code: '200504',
            func: () => {
                alert('输入预定房间天数超过30天，请重新输入。');
            }
        },
        USERCHOOSETIMENOTNOWTIME: { // 用户入住时间必须为当天时间才能入住
            code: '200506',
            func: () => {
                alert('用户入住时间必须为当天时间才能入住，请重新选择入住时间。');
            }
        },
        NOMORETHANTODAY: {// 用户输入住宿的时间不能超过今天
            code: '200507',
            func: () => {
                alert('用户输入住宿的时间不能超过今天，请重新选择入住时间。');
            }
        }
    };
    if (statusCode !== STATUSCODEOBJECT.SUCCESSFULUSERLOGIN.code && statusCode !== STATUSCODEOBJECT.NOMESSEGESUCCESSFULUSERLOGIN.code) {
        try {
            for (let key in STATUSCODEOBJECT) {
                // console.log(STATUSCODEOBJECT[key].code, statusCode);
                if (STATUSCODEOBJECT[key].code === statusCode) {
                    // console.log(`执行方法${STATUSCODEOBJECT[key].code}`);
                    STATUSCODEOBJECT[key].func();
                    return false
                } else {
                    throw '暂无该状态，请联系管理员'
                }
            }
        } catch (error) {
            alert(error);
            console.log(error)
        }

    } else return true;
}
