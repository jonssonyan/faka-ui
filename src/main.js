import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button, Form, FormItem, Input, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
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
