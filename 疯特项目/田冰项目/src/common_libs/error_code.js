const DEFAULT_MESSAGE = 'Something went wrong, please try again.';
const errorCode = {};
const codeInfoMap = [];

/**
 * 定义一个错误码
 * @param {number} code 错误码，必须唯一
 * @param {null | string, optional} message 错误描述，会下发给浏览器端让用户看见。若不填则使用默认值。
 *                                   通过特殊标志${1}或${2}等，配合MError的setMessageTemplateData方法可以嵌入变量
 * @param {boolean, optional} fatal 是否是致命错误，默认为true。致命错误在测试环境会显示大红条提示
 * @return {number}
 */
function defineCode(code, message, fatal) {
    if (codeInfoMap[code]) {
        throw new Error(`duplicated code:${code}`);
    }
    codeInfoMap[code] = {
        message: message || `(${code})${DEFAULT_MESSAGE}`,
        fatal: fatal === undefined || fatal
    };
    return code;
}

/**
 * 获取错误码对应的错误信息
 * @param {number} code
 * @returns {{message: string, fatal: boolean}}
 */
errorCode.getCodeData = function getCodeData(code) {
    if (codeInfoMap[code]) {
        return codeInfoMap[code];
    }
    console.error(`Unknown code:${code}`);
    return {
        message: DEFAULT_MESSAGE,
        fatal: true
    };
};

/* eslint-disable no-template-curly-in-string */
/** 无错误 */
errorCode.SUCCESS = defineCode(0, '');

/** 不知名错误 */
errorCode.UNKNOWN = defineCode(1, 'Unknown Error');

/** **********************************以下前端相关的错误码*********************************** */

/** 401未授权 */
errorCode.HTTP_UNAUTHORIZED = defineCode(1001, 'Unauthorized');

/** 前端请求超时 */
errorCode.HTTP_TIME_OUT = defineCode(1002, 'Time out');

/** 403禁止访问 */
errorCode.HTTP_FORBIDDEN = defineCode(1003, 'Forbidden');

/** 404找不到 */
errorCode.HTTP_NOT_FOUND = defineCode(1004, 'Not found');

/** 其它前端请求网络错误 */
errorCode.HTTP_NETWORK_ERR = defineCode(1005, 'Connection error');

/** **********************************以下是各业务用的错误码*********************************** */

module.exports = errorCode;

/** 后端代码crash */
errorCode.SERVER_CRASH = defineCode(-10001);

/** 用户未登录 */
errorCode.NOT_LOGIN = defineCode(-10030);

/** 安全校验未通过 */
errorCode.NOT_SAFE = defineCode(-10034);

/** 参数错误 */
errorCode.PARAM_ERR = defineCode(-10043);

/** 扣款失败 */
errorCode.PAY_FAILED = defineCode(-10050);

/** 请求不被允许（POST、GET） */
errorCode.FORBIDDEN = defineCode(-10403);
