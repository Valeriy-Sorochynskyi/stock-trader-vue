import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => {
      return import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */ '../views/Portfolio.vue'),
    beforeEnter (to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: () => import(/* webpackChunkName: "Stocks" */ '../views/Stocks.vue'),
    beforeEnter (to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/auth/Login.vue'),
    beforeEnter (to, from, next) {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next('/stocks')
      }
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/auth/SignUp.vue'),
    beforeEnter (to, from, next) {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next('/stocks')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
