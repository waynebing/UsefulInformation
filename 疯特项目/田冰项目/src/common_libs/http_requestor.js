/**
 * Created by lnk on 2016/4/19.
 */
import axios from 'axios'
import Qs from 'qs'
import errorCode from './error_code'

const httpRequestor = {
    // 默认的异常处理方法，会传入完整的data对象，可以在这里弹提示框
    defaultErrorHandler: null,
    baseURL: gBaseUrl,
};
// 后端默认超时时间必须比这里短
const DEFAULT_TIME_OUT = 35000;
// 上传文件的默认超时时间
const DEFAULT_UPLOAD_TIME_OUT = 120000;

const axiosInstance = axios.create({
    baseURL: httpRequestor.baseURL,
    timeout: DEFAULT_TIME_OUT,
    headers: {'wefinttoken': 'f03d3215-5cf2-11e8-9cfc-7cd30adfe906'},
});
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseFail);

/**
 * 在url后面加个随机参数，以防浏览器缓存请求
 * @param {string} url
 * @return {string}
 */
function addVersionToUrl(url) {
    // return url.includes('?') ? `${url}&_=${Date.now()}` : `${url}?_=${Date.now()}`
    return url
}

/**
 * 通过post发送数据，使后端直接收到json格式的数据。并统一处理常见的错误
 * @param {string} url
 * @param {object?} data={}
 * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
 * @param {int?} timeout 超时时间，默认10秒
 * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
 */
httpRequestor.post = function postJson(url, data = {}, throwError, timeout) {
    return commonAjax({
        method: 'POST',
        url,
        // data: JSON.stringify(data),
        data: Qs.stringify(data),
        errorHandler: !throwError && httpRequestor.defaultErrorHandler || null,
        timeout: timeout || DEFAULT_TIME_OUT,
        // withCredentials: true,
        headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'X-Requested-With': 'XMLHttpRequest'
        }
    });
};

/**
 * 通过表单发送同步的post请求，服务器端可以在回包时重定向或下发文件
 * @param {string} url
 * @param {object?} data={} 要发送数据的键值对，值不可以是对象，必须序列化成字符串
 */
httpRequestor.postAndDownload = function postJsonSync(url, data = {}) {
    const postForm = document.createElement('form');// 表单对象
    postForm.method = 'POST';
    postForm.action = addVersionToUrl(httpRequestor.baseURL + url.slice(1));
    // postForm.enctype = 'application/json';
    Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', typeof value === 'object' ? JSON.stringify(value) : String(value));
        postForm.appendChild(input);
    })
    document.body.appendChild(postForm);
    postForm.submit();
    document.body.removeChild(postForm);
};

/**
 * 通过表单post上传文件并接收json格式的数据。并统一处理常见的错误
 * @param {string} url
 * @param {FormData|object} formElem FormData对象，或form Dom元素，其中需要含有一个name为files的选择文件的input元素
 * @param {Function?} onUploadProgress 上传进度回调，参数为event
 * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
 * @param {int?} timeout 超时时间，默认10秒
 * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
 */
httpRequestor.uploadFile = function uploadFile(url, formElem, onUploadProgress, throwError, timeout) {
    // $(formElem).attr('enctype', 'multipart/form-data');
    return commonAjax({
        method: 'POST',
        url,
        data: formElem instanceof FormData ? formElem : new FormData(formElem),
        onUploadProgress,
        errorHandler: !throwError && httpRequestor.defaultErrorHandler || null,
        timeout: timeout || DEFAULT_UPLOAD_TIME_OUT,
    });
};

/**
 * 通过get发送并接收json格式的数据（get发的本来就是json格式）。并统一处理常见的错误
 * @param {string} url
 * @param {object?} params={}
 * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
 * @param {int?} timeout 超时时间，默认10秒
 * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
 */
httpRequestor.get = function get(url, params = {}, throwError, timeout) {
    return commonAjax({
        method: 'GET',
        url,
        // params,
        params: Qs.stringify(params),
        errorHandler: !throwError && httpRequestor.defaultErrorHandler || null,
        timeout: timeout || DEFAULT_TIME_OUT,
        // withCredentials: true,
        headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'X-Requested-With': 'XMLHttpRequest'
        }
    });
};

/**
 * 通用的发包和回包处理逻辑。会将成功获取到的带有错误码的数据转换为异常通过catch返回出来，并会将所有error对象封装成统一的形式
 * @param config
 * @return {Promise} 返回一个promise对象。其中then方法传递回包中的data数据；catch事件则传递整个回包，其参数为{data:{},status{code:123,message:'xxx'}}
 */
function commonAjax(config) {
    config.url = addVersionToUrl(config.url)
    return axiosInstance(config)
}

/**
 * 对成功返回的请求回包进行数据预处理
 * @param response
 * @returns {Promise}
 */
function handleResponseSuccess(response) {
    const result = response.data;

    if (typeof result.code !== 'number') {
        // 老版本协议下发的数据，只有data
        console.warn('Old version of protocol.', response.config.url)
        return result
    }
    if (result.code === 0) {
        // 后端在data为undefined时下发的包体里就没有data属性了，所以这里不能写result.data||result
        return result.data;
    }
    return handleError(response.config, result);
}

/**
 * 对发送失败的请求进行数据预处理，将error对象封装为统一的形式
 * @param error
 * @returns {Promise}
 */
function handleResponseFail(error) {
    let result
    if (error.response) {
        // 请求已发送，响应中返回了非2xx的错误码，包括304等
        const codeMap = {
            401: errorCode.HTTP_UNAUTHORIZED,
            403: errorCode.HTTP_FORBIDDEN,
            404: errorCode.HTTP_NOT_FOUND,
        }
        const code = codeMap[error.response.status] || errorCode.HTTP_NETWORK_ERR
        result = fillErrorMessage(code, `${error.response.status} ${error.response.statusText}`, error.response.data)
    } else if (error.message.startsWith('timeout of ')) {
        // 请求没有发出去，本地产生的错误
        result = fillErrorMessage(errorCode.HTTP_TIME_OUT, 'no response')
    } else if (error instanceof Error) {
        error.code = errorCode.HTTP_NETWORK_ERR
        error.debugMessage = error.message
        error.message = errorCode.getCodeData(errorCode.HTTP_NETWORK_ERR).message
        result = error
    } else {
        result = fillErrorMessage(errorCode.HTTP_NETWORK_ERR, error.message)
    }
    return handleError(error.config, result);
}

/**
 * 根据错误码生成标准格式的错误信息对象
 * @param {number} code 定义在errorCode中的错误码
 * @param {string?} debugMessage 调试用的错误信息
 * @param {*?} data 请求回包中的数据
 * @returns {{data: null, code: number, message: string, debugMessage: string}}
 */
function fillErrorMessage(code, debugMessage, data = null) {
    return {
        data,
        code,
        message: errorCode.getCodeData(code).message,
        debugMessage,
    };
}

/**
 * 统一的异常对象封装逻辑，在这里抛出异常
 * @param {object} requestConfig 发请求时传入axios的配置信息对象
 * @param {object} result 请求回包对象，或异常信息
 * @param {object} result.data
 * @param {number} result.code
 * @param {string} result.message
 * @param {string} result.debugMessage
 * @returns {Promise}
 */
function handleError(requestConfig, result) {
    // 必须是Error对象，否则throw时vuex要报warning
    let err;
    if (result instanceof Error) {
        err = result
    } else {
        err = new Error(result.message);
        err.data = result.data;
        err.code = result.code;
        err.debugMessage = result.debugMessage;
    }

    if (requestConfig && requestConfig.errorHandler) {
        err.url = requestConfig.url
        requestConfig.errorHandler(err)
        err.processed = true
    }
    return Promise.reject(err)
}

export default httpRequestor;
