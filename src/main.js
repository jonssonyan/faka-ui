import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    Aside,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Col,
    Container,
    Form,
    FormItem,
    Header,
    Input,
    Main,
    Menu,
    MenuItem,
    Message,
    Row,
    Submenu
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Input);
Vue.use(Col);
Vue.use(Row);
// 导入弹框提示组件
Vue.prototype.$message = Message
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/card'
axios.interceptors.request.use((config) => {
    config.headers.token = window.sessionStorage.getItem('token')
    return config
})
// axios
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
