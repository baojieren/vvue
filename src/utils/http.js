import axios from 'axios'
import router from '@/router'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'https://api.baojie.ink' : 'https://api.baojie.ink',
    timeout: 10000
});

// 请求拦截
instance.interceptors.request.use(config => {
    // 发送请求前设置请求头token
    if (JSON.parse(localStorage.getItem('user_token'))) {
        config.headers.common['Authorization'] = 'Bearer' + ' ' + JSON.parse(localStorage.getItem('user_token'))
    }
    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截
instance.interceptors.response.use(res => {
    // 无权限
    if (res.data.code === 401) {
        router.push({name: 'login'});
    }
    return res;
}, error => {
    return Promise.reject(error)
});
export default instance;
