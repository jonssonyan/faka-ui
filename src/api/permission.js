import request from "../utils/request";

export function getById(params) {
    return request({
        url: process.env.CARD_API + '/getById',
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
