import request from "../utils/request";

/**
 * 通过productId计算产品的库存
 * @param params
 * @returns {AxiosPromise}
 */
export function countByProductId(params) {
    return request({
        url: process.env.CARD_API + '/countByProductId',
        method: 'post',
        data: params
    })
}

/**
 * 分页查询卡密内容
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
 * 添加或者更新卡密
 * @param params
 * @returns {AxiosPromise}
 */
export function saveOrUpdate(params) {
    return request({
        url: process.env.CARD_API + '/saveOrUpdate',
        method: 'post',
        data: params
    })
}

/**
 * 通过id查询卡密信息
 * @param params
 * @returns {AxiosPromise}
 */
export function getById(params) {
    return request({
        url: process.env.CARD_API + '/getById',
        method: 'post',
        data: params
    })
}

/**
 * 删除卡密
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
