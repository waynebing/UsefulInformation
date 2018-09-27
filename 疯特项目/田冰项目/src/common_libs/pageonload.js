/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 2018/4/17 0017
 * Time: 13:32
 *
 */
/* eslint-disable*/

import {LoginApiHttpServers} from "../api/api";

let LoginApiHttpServer = LoginApiHttpServers;

function pageloadServers(ISPRODUCTION) {
    this.ISPRODUCTION = ISPRODUCTION;
    this.TEST_SERVER_ADD_PORT = 'http://192.168.0.131';
    this.PRODUCTION_ADD_PORT = 'http://115.28.115.6';
    this.script = document.createElement('script');
    this.head = document.getElementsByTagName('head')[0];
    this.scriptType = 'text/javascript';
    this.script.type = this.scriptType;

    /**
     *  根据 网站 需求 切换 测试 或生产环境
     * @param type 当前请求地址 端口号分配
     */
    this.pageloadUrlConfig = (type) => {
        let IP_ADD_PORT;
        this.ISPRODUCTION === 'ISPRODUCTION' ? IP_ADD_PORT = this.PRODUCTION_ADD_PORT : IP_ADD_PORT = this.TEST_SERVER_ADD_PORT;
        switch (type) {
            case 'login':
                return IP_ADD_PORT + ':48080'; // 登录 、 PMS 模块
            case 'register':
                return IP_ADD_PORT + ':30000'; // 注册 、 设置
            case 'finace':
                return IP_ADD_PORT + ':20000'; // 金融提交、审核
            case 'ossDown':
                return IP_ADD_PORT + ':30050'; // 阿里云OSS 下载
            case 'ossUpload':
                return "http://inner-wefint.oss-cn-qingdao.aliyuncs.com" //OSS上传图片
        }
    };
    /**
     * 检测当前浏览器的网络状态
     * @param error  当前请求错误时WINDOW 对象返回的错误码
     */
    this.pageloadCheckNavigator = (error) => {
        return window.navigator.onLine ? console.log('网络连接正常') : alert(`网络连接异常，请重新检查网络连接${error}`);
    };

    /**
     *
     * @param statusCode  当前请求返回的状态码
     * @returns {boolean}
     * @param finance
     */
    this.testNowStatusCode = (statusCode, finance) => {
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
                    return !finance ? alert('您的账号和密码不匹配，请检查您输入的账号与密码是否正确。') : alert('验证码错误，请重新输入验证码')
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
                    }
                }
            } catch (error) {
                alert('暂无该状态，请联系管理员.');
                console.log(error)
            }

        } else return true;
    };

    /**
     *
     * @returns {Node}  创建JQUERY 链接
     */
    this.pageloadAppendJquery = () => {
        let NowUrlHostName = window.location.host;
        NowUrlHostName === 'wefint.com' || NowUrlHostName === 'www.wefint.com' ? this.script.src = '../js/jquery.min.js' : this.script.src = '../server/jquery.min.js';
        return this.head.appendChild(this.script);
    };


    /**
     * 监测网站是否已经被登陆过 如果false 则系统直接返回登录页面
     */
    this.pageloadCheckIsLogined = () => {
        let token = this.pageloadGetCookie('token');

        return token === null || token === '' || token === undefined ? window.location.href = './login.html' : false;
    };
    /**
     * 给网页加载公共的样式 。
     */
    this.pageLoadPublicStyle = () => {
        window.alert = (msg, callback) => {
            let status = false;
            let alertShode = document.createElement("div"); // 创建整个alert 区域；
            let alertBox = document.createElement("div"); // 创建整个alert 区域；
            let alertBoxHead = document.createElement("div"); // 创建alert区域的头部；
            let alertBoxBody = document.createElement("div"); // 创建 alert文字显示区域;
            let alertBoxFoot = document.createElement("div"); // 创建 alert 底部按钮区域；
            let alertInput = document.createElement("div"); // 创建一个按钮
            alertShode.id = 'alertShode';
            alertBox.id = 'alertBox';                 // 创建盒子自带信息
            alertBoxHead.innerText = '信息';
            alertBoxFoot.id = 'alertBoxFoot';
            alertInput.innerText = '确定';
            alertBoxBody.innerText = msg;
            alertInput.id = 'alertInput';
            let alertShodeStyle = {
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: '998',
                backgroundColor: '#000',
                opacity: '0.3',
                top: '0',
                left: '0'
            };
            let alertBoxStyle = { // 定义alert区域的样式
                width: '20%',
                height: '205px',
                backgroundColor: '#fff',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: 'translate(-50%,-50%)',
                zIndex: "9999999",
                textAlign: "center",
                borderRadius: '20px',
                boxShadow: '1px 1px 50px rgba(0,0,0,.3)',
                overflow: 'hidden',
            };
            let alertBoxHeadStyle = {
                width: '100%',
                height: '50px',
                lineHeight: '50px',
                paddingLeft: '30px',
                textAlign: 'left'
            };
            let alertBoxBodyStyle = {
                width: '100%',
                height: '100px',
                lineHeight: '80px',
                textAlign: 'center',
                color: '#000',
            };
            let alertBoxFootStyle = {
                width: '100%',
                height: '50px',
                position: 'relative'
            };
            let alertInputStyle = {
                width: '125px',
                height: '35px',
                border: '1px solid #dedede',
                backgroundColor: '#fff',
                color: '#333',
                borderRadius: '17px',
                lineHeight: '35px',
                textAlign: 'center',
                position: 'absolute',
                right: '20px',
                cursor: 'pointer',
            };
            for (let i in alertShodeStyle) alertShode.style[i] = alertShodeStyle[i];
            for (let i in alertBoxStyle) alertBox.style[i] = alertBoxStyle[i];  // 将样式循环放入元素中
            for (let i in alertBoxHeadStyle) alertBoxHead.style[i] = alertBoxHeadStyle[i];
            for (let i in alertBoxBodyStyle) alertBoxBody.style[i] = alertBoxBodyStyle[i];
            for (let i in alertBoxFootStyle) alertBoxFoot.style[i] = alertBoxFootStyle[i];
            for (let i in alertInputStyle) {
                alertInput.style[i] = alertInputStyle[i];
                //把创建的元素依次添加到body中
                new Promise(resolve => {
                    return resolve($('body').append(alertShode))
                }).then(resolve => {
                    return !!resolve && ($('body').append(alertBox));
                }).then(resolve => {
                    return !!resolve && $('#alertBox').append(alertBoxHead);
                }).then(resolve => {
                    return !!resolve && $('#alertBox').append(alertBoxBody);
                }).then(resolve => {
                    return !!resolve && $('#alertBox').append(alertBoxFoot);
                }).then(resolve => {
                    return !!resolve && $('#alertBoxFoot').append(alertInput);
                }).then(resolve => {
                    let alertInputNode = $('#alertInput');
                    return !!resolve && alertInputNode.hover(() => {  // 添加按钮移入样式
                        alertInputNode.css({border: '1px solid #4360e9', color: '#4360e9'});
                    }, () => {
                        alertInputNode.css({border: '1px solid #ddd', color: '#000'});
                    });
                }).then(resolve => {
                    let alertInputNode = $('#alertInput');
                    return !!resolve && alertInputNode.click(() => { // 添加按钮点击后整个alert区域消失
                        return $('#alertShode').remove() && $('#alertBox').remove() && callback ? callback() : false;
                    });
                });
            }
        }
    };
    /**
     * 根据标准时间 获取格式时间
     * @returns {string}
     */
    this.pageloadFormatDate = (date) => {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    /**
     *
     * @param thisYear 当前查询年份
     * @param thisMounth    当前查询月份
     * @return {number}
     */
    this.pageloadGetThisMounthNum = (thisYear, thisMounth) => {
        let d = new Date(thisYear, thisMounth, 0);
        return d.getDate();
    };

    /**
     * 根据当前时间查询当前星期
     * @param thisTime
     * @returns {string}
     */
    this.pageloadGetThisWeekNum = (thisTime) => {
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
    };
    /**
     * 根据URL 参数获取相应参数的值
     * @param UrlParam  需要获取URL参数值得 参数
     * @returns {string}
     */
    this.pageloadGetUrlParamValue = (UrlParam) => {
        let reg = new RegExp("(^|&)" + UrlParam + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        let context = "";
        if (r !== null)
            context = r[2];
        reg = null;
        r = null;
        return context === null || context === "" || context === "undefined" ? "" : context;
    };

    /**
     *  设置网页COOKIE
     * @param cookieName  传递COOKIE NAME
     * @param cookieValue 传递 COOKIE VALUE
     * @param time         需要保存 COOKIE 的时间
     */
    this.pageloadSetCookie = (cookieName, cookieValue, time) => {
        console.log(`设置KOOKIE`);
        let A = new Date();
        A.setDate(A.getDate() + time);
        return document.cookie = cookieName + "=" + escape(cookieValue) + ((time === null) ? "" : ";expires=" + A.toGMTString());
    };

    /**
     *  获取网页当前 COOKIE
     * @param cookieName   传入需要获取的COOKIE NAME
     * @returns {string}    返回COOKIE值
     */
    this.pageloadGetCookie = (cookieName) => {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(cookieName + "=");
            if (c_start !== -1) {
                c_start = c_start + cookieName.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length
                }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    };

    /**
     * 删除网页内的COOKIE
     * @param cookieName  传入需要删除 COOKIE的NAME 值
     */
    this.pageloadDelCookie = (cookieName) => {
        let A = new Date();
        A.setTime(A.getTime() - 1);
        let C = this.pageloadGetCookie(cookieName);
        if (C !== null) return document.cookie = cookieName + "=" + C + ";expires=" + A.toGMTString();
        else return false
    };

    /**w
     *
     * @param methoud  AJAX 请求方式
     * @param url   AJAX 请求地址
     * @param Data  AJAX 请求参数
     * @param errfn 返回错误的方法
     * @param sucfn 正确的返回方法
     * @param needHeader
     * @param contentType
     */
    this.pageloadAjaxHttp = (methoud, url, Data, errfn, sucfn, needHeader, contentType) => {
        let requestObj = {
            cache: true,
            type: methoud,
            url: url,
            data: Data,
            async: false,
            error: errfn,
            success: sucfn,
        };
        needHeader ? requestObj.headers = {'wefinttoken': this.pageloadGetCookie('token')} : false;
        contentType ? requestObj.contentType = 'application/json' : false;
        return $.ajax(requestObj);
    };

    /**
     *
     * @param needCheckCodeName  // 需要检验输入码的名称  rightExpression 对象内包含的键
     * @param needCheckCodeFormat // 需要检验输入码的 码表
     * @returns {*} 返回BOOLEAN 类型
     * @param errorfunc
     * @param suceesfunc
     */
    this.pageloadCheckFormatIsTure = (needCheckCodeName, needCheckCodeFormat, errorfunc, suceesfunc) => {
        let rightExpression = {
            phoneNumber: /^((13|15|18|14|17)+\d{9})$/, // 检验手机号码
            isString: /[^0-9]/,  // 检验是否为非数字输入
            number: /[0-9]/,  // 检验是否为number类型
            date: /^\d{4}(-|\/)\d{1,2}\1\d{1,2}$/, // 检验是否为时间格式 （YY-MM-DD）
            email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, // 检验是否为电子邮箱
            idCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/, // 检验是否为合格身份证
            integer: /^[1-9]\d*$/, // 检验是否为正整数
            companyphone: /\d{3}-\d{8}|\d{4}-\d{7}/, // 验证是否为公司电话号码
            businessLicense: /^([0-9a-zA-Z]{18}$|\d{15}$)/, //营业执,
            finaceLoginPassword: /^[0-9a-zA-Z!@#$%^&*_]{6,16}$/, // 金融登录密码验证
        };
        for (let key in rightExpression) {
            try {
                if (key === needCheckCodeName) {
                    if (errorfunc && suceesfunc) {
                        return rightExpression[key].test(needCheckCodeFormat) ? suceesfunc : errorfunc;
                    } else {
                        return rightExpression[key].test(needCheckCodeFormat);
                    }
                }
            } catch (error) {
                console.log(`暂无此种检验规则，请添加${needCheckCodeName}规则`)
            }

        }
    };

    this.logout = () => {
        let Data = null;
        try {
            return LoginApiHttpServer.logoutHttpServer(Data, result => {
                return new Promise(resolve => {
                    return resolve(this.testNowStatusCode(result.code));
                }).then(resolve => {
                    return resolve ? this.pageloadDelCookie('userName') &&
                        this.pageloadDelCookie('token') &&
                        (window.location.href = "./login.html") : (window.location.href = "./login.html")
                })
            })
        } catch (error) {
            return this.pageloadCheckNavigator('error')
        }
    }
}

let NowUrlHostName = window.location.host;
export let allPageloaadServers = NowUrlHostName === 'wefint.com' || NowUrlHostName === 'www.wefint.com' ? new pageloadServers('NOPRODUCTION') : new pageloadServers('NOPRODUCTION');

