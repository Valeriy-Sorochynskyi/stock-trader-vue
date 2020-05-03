import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/main.scss'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://stock-trader-4d2c6.firebaseio.com'
axios.interceptors.request.use(config => {
  config.url = config.url + '?auth=' + localStorage.getItem('token')

  return config
})

axios.interceptors.response.use(response => {
  console.log(response)

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.filter('currency', (value) => '$' + value.toLocaleString())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
