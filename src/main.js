import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios';
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/card'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
