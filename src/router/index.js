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
import RightsList from '../components/power/RightsList.vue'
import RoleList from '../components/power/RoleList.vue'
import Register from "../components/Register";
import axios from "axios";
import ExportFile from "../components/file/ExportFile";
import Panel from "../components/panel/Panel";

Vue.use(VueRouter);

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
        path: '/register',
        component: Register
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/panel',
                component: Panel
            },
            {
                path: '/exportFile',
                component: ExportFile
            },
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
                path: '/cardList',
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
            {
                path: '/rightsList',
                component: RightsList
            },
            {
                path: '/roleList',
                component: RoleList
            },
        ]
    }
];

const router = new VueRouter({
    routes
});

// 路由控制守卫,解决需要登录才可以访问的页面
router.beforeEach((to, from, next) => {
    // 如果访问的首页直接放行
    if (to.path === '/login' || to.path === '/register') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('Authorization');
    // 没有token放回登录界面
    if (!tokenStr) return next('/login');
    // 有token放行
    return next()
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('Authorization');
    return config
});

// axios 配置
axios.defaults.baseURL = 'http://localhost:8888/card';
Vue.prototype.$http = axios;

export default router
