import request from "../utils/request";

export function selectPage(params) {
    return request({
        url: process.env.CARD_API + '/selectPage',
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

export function faceToFace(params) {
    return request({
        url: process.env.CARD_API + '/faceToFace',
        method: 'post',
        data: params
    })
}
