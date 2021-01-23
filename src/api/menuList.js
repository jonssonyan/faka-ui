import request from "../utils/request";

export function selectList(params) {
    return request({
        url: process.env.CARD_API + '/selectList',
        method: 'post',
        data: params
    })
}

export function selectPage(params) {
    return request({
        url: process.env.CARD_API + '/selectPage',
        method: 'post',
        data: params
    })
}

export function removeById(params) {
    return request({
        url: process.env.CARD_API + '/removeById',
        method: 'post',
        data: params
    })
}

export function saveOrUpdate(params) {
    return request({
        url: process.env.CARD_API + '/saveOrUpdate',
        method: 'post',
        data: params
    })
}
