import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]

const router = new VueRouter({
    routes
})

// 路由控制守卫
router.beforeEach((to, from, next) => {
    // 如果访问的首页直接放行
    if (to.path === '/login') return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    // 没有token放回登录界面
    if (!tokenStr) return next('/login')
    // 有token放行
    return next()
})

export default router
