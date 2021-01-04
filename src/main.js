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
    Dialog,
    Form,
    FormItem,
    Header,
    Input,
    Main,
    Menu,
    MenuItem,
    Message,
    MessageBox,
    Option,
    Pagination,
    Row,
    Select,
    Submenu,
    Switch,
    Table,
    TableColumn,
    Tooltip
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);

// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/card';
axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('Authorization');
    console.log(config.headers.Authorization);
    return config
});
// 导入弹框提示组件
Vue.prototype.$message = Message;
// confirm
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
