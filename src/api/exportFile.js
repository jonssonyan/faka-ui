import request from "../utils/request";

/**
 * 分页展示文件列表
 * @param params
 * @returns {AxiosPromise}
 */
export function selectPage(params) {
    return request({
        url: process.env.CARD_API + '/selectPage',
        method: 'post',
        data: params
    })
}

/**
 * 将excel下载到本地
 * @param params
 * @returns {AxiosPromise}
 */
export function downloadExportFile(params) {
    return request({
        url: process.env.CARD_API + '/downloadExportFile',
        method: 'post',
        data: params
    })
}

/**
 * 删除文件
 * @param params
 * @returns {AxiosPromise}
 */
export function removeById(params) {
    return request({
        url: process.env.CARD_API + '/removeById',
        method: 'post',
        data: params
    })
}

/**
 * 在服务器生成excel
 * @param params
 * @returns {AxiosPromise}
 */
export function generateExportFile(params) {
    return request({
        url: process.env.CARD_API + '/generateExportFile',
        method: 'post',
        data: params
    })
}
