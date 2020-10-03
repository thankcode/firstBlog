import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css'
import store from './store'
import axios from 'axios'
axios.defaults.withCredentials = true
    //加密
import hmacSHA512 from 'crypto-js'

Vue.prototype.encrypts = hmacSHA512

//MD 挂载
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

// 设置md样式
import './plugins/element.js'

import hljs from 'highlight.js'
import 'highlight.js/styles/dracula.css' //样式文件

Vue.directive('highlight', el => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})


// 全局过滤器
Vue.filter('timeFormat', function(value) {
    return (value.substring(0, 10))
})


axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// 拦截器
axios.interceptors.request.use(res => {
    if (localStorage.getItem('Authorization')) {
        res.headers.Authorization = localStorage.getItem('Authorization');
    }
    return res;
})


axios.interceptors.response.use(req => {
    if (req.status === 200 && req.data.status && req.data.status === 401) {
        localStorage.removeItem('Authorization')
        router.replace('/admin')
    }
    return req;
})