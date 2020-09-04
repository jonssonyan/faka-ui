import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import UserList from '../components/user/UserList.vue'
import CategoryList from '../components/category/CategoryList.vue'
import ProductList from '../components/product/ProductList.vue'
import CardList from '../components/card/CardList.vue'
import OrderList from '../components/order/OrderList.vue'
import Alipay from '../components/config/Alipay.vue'

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
        component: Home,
        children: [
            {
                path: '/userList',
                component: UserList
            },
            {
                path: '/categoryList',
                component: CategoryList
            },
            {
                path: '/productList',
                component: ProductList
            },
            {
                path: '/CardList',
                component: CardList
            },
            {
                path: '/orderList',
                component: OrderList
            },
            {
                path: '/alipay',
                component: Alipay
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

// 路由控制守卫,解决需要登录才可以访问的页面
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
