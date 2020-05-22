import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 引入第三方icon
import './assets/icon/iconfont.css'

// 导入nprogress 包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 拦截器，请求拦截
// 在request拦截器中展示进度条 NProgress.start()
Axios.interceptors.request.use(config => {
  NProgress.start()
  // config返回请求对象
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 在response 拦截器中，隐藏进度条 NProgress.done()
Axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
