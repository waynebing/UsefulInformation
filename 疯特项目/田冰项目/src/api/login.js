/**
 * Created by lnk on 2017/9/26.
 */

import httpRequestor from '../common_libs/http_requestor'

/**
 * 获取自己的相关信息
 * @param {number} index
 * @return {Promise}
 */
function getMyInfo(index) {
    return httpRequestor.post('moments/hotmoments', {
        idx: index,
    })
}

export default {
    getMyInfo
}
