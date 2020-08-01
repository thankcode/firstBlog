import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css'
import axios from 'axios'
import './plugins/element.js'

axios.defaults.baseURL = 'http://192.168.43.78:3000'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
