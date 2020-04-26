import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icon/iconfont.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import './assets/globle.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头添加Authorization字段为服务端返回的token
  config.headers.Authorization = sessionStorage.getItem('token')
  // return config是固定用法 必须有返回值
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
