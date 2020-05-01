import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://stock-trader-4d2c6.firebaseio.com'

Vue.use(ElementUI)
Vue.filter('currency', (value) => '$' + value.toLocaleString())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
