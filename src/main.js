import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './core/filters'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins'
import '@/assets/styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
