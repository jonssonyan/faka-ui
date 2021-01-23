import request from "../utils/request";

/**
 * 修改或者添加支付配置
 * @param params
 * @returns {AxiosPromise}
 */
export function selectPage(params) {
    return request({
        url: process.env.ALIPAY_API + '/saveOrUpdate',
        method: 'post',
        data: params
    })
}

/**
 * 修改或者添加支付配置
 * @param params
 * @returns {AxiosPromise}
 */
export function saveOrUpdate(params) {
    return request({
        url: process.env.ALIPAY_API + '/saveOrUpdate',
        method: 'post',
        data: params
    })
}

/**
 * 通过id查询支付配置
 * @param params
 * @returns {AxiosPromise}
 */
export function getById(params) {
    return request({
        url: process.env.ALIPAY_API + '/getById',
        method: 'post',
        data: params
    })
}

/**
 * 通过订单号查询订单
 * @param params
 * @returns {AxiosPromise}
 */
export function selectByOutTradeNo(params) {
    return request({
        url: process.env.ALIPAY_API + '/selectByOutTradeNo',
        method: 'post',
        data: params
    })
}

/**
 * 通过订单号取消交易
 * @param params
 * @returns {AxiosPromise}
 */
export function cancelTrade(params) {
    return request({
        url: process.env.ALIPAY_API + '/cancelTrade',
        method: 'post',
        data: params
    })
}

export function removeById(params) {
    return request({
        url: process.env.ALIPAY_API + '/removeById',
        method: 'post',
        data: params
    })
}
