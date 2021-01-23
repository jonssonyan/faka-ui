import request from "../utils/request";

/**
 * 分页查询用户
 * @param params
 * @returns {AxiosPromise}
 */
export function selectPage(params) {
    return request({
        url: process.env.USER_API + '/selectPage',
        method: 'post',
        data: params
    })
}

/**
 * 添加或或者修改用户
 * @param params
 * @returns {AxiosPromise}
 */
export function saveOrUpdate(params) {
    return request({
        url: process.env.USER_API + '/saveOrUpdate',
        method: 'post',
        data: params
    })
}

/**
 * 通过id删除用户
 * @param params
 * @returns {AxiosPromise}
 */
export function removeById(params) {
    return request({
        url: process.env.USER_API + '/removeById',
        method: 'post',
        data: params
    })
}

/**
 * 通过id查询用户
 * @param params
 * @returns {AxiosPromise}
 */
export function getById(params) {
    return request({
        url: process.env.USER_API + '/getById',
        method: 'post',
        data: params
    })
}

/**
 * 注销登录
 * @param params
 * @returns {AxiosPromise}
 */
export function loginOut(params) {
    return request({
        url: process.env.USER_API + '/loginOut',
        method: 'post',
        data: params
    })
}
