import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css'
import axios from 'axios'

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
Vue.filter('timeFormat', function (value) {
  return (value.substring(0,10))
})


axios.defaults.baseURL = 'http://192.168.43.78:3000'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// 拦截器