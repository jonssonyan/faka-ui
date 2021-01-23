import request from "../utils/request";

export function getById(params) {
    return request({
        url: process.env.CARD_API + '/getById',
        method: 'post',
        data: params
    })
}

/**
 * 通过id查询产品信息
 * @param params
 * @returns {AxiosPromise}
 */
export function selectList(params) {
    return request({
        url: process.env.CARD_API + '/selectList',
        method: 'post',
        data: params
    })
}

/**
 * 查看指定分类的产品
 * @param params
 * @returns {AxiosPromise}
 */
export function selectByCategoryId(params) {
    return request({
        url: process.env.CARD_API + '/selectByCategoryId',
        method: 'post',
        data: params
    })
}

/**
 * 分页查询产品信息
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
 * 删除产品
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
 * 修改或者添加产品信息
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
