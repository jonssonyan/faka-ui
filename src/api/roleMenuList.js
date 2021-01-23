import request from "../utils/request";

export function selectPage(params) {
    return request({
        url: process.env.CARD_API + '/selectPage',
        method: 'post',
        data: params
    })
}
