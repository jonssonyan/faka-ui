import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    Aside,
    Button,
    Container,
    Form,
    FormItem,
    Header,
    Input,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
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
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
// 导入弹框提示组件
Vue.prototype.$message = Message
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/card'
// axios
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
