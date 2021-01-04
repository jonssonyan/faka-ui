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



export default router
