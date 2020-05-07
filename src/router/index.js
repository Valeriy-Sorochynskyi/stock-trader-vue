import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'

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
      return import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */ '@/views/Portfolio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: () => import(/* webpackChunkName: "Stocks" */ '@/views/Stocks.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '@/views/auth/SignUp.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.idToken) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
