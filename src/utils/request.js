// 创建axios实例
import axios from "axios";
import {getToken} from "./auth";

const service = axios.create({
    baseURL: process.env.BASE_API,
    withCredentials: true,
    timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(config => {
    // 在发送请求之前做某事，比如说 设置token
    // config.headers['token'] = 'token';
    config.headers['Authorization'] = getToken();
    return config;
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
    const res = response.data;
    // 如果返回的状态不是200 就主动报错
    if (res.state !== 200) {
        return Promise.reject(res.message)
    }
    return response;
}, error => {
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data);
});

export default service
