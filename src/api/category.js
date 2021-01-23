import request from "../utils/request";

/**
 * 分页查询分类信息
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
 * 单个删除分类
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
 * 修改或者更新分类
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

export function select(params) {
    return request({
        url: process.env.CARD_API + '/select',
        method: 'post',
        data: params
    })
}

export function getById(params) {
    return request({
        url: process.env.CARD_API + '/getById',
        method: 'post',
        data: params
    })
}
