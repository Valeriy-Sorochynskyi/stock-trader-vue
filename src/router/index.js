import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'
import Stocks from '@/pages/Stocks.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Prices from '@/pages/Prices.vue'
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
    name: 'NotFound',
    component: () => {
      return import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound.vue')
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/pages/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '@/pages/auth/SignUp.vue')
  },
  {
    path: '/prices',
    name: 'Prices',
    component: Prices,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!store.state.auth.idToken

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login')
    } else if (store.state.auth.user.id &&
      !store.state.auth.user.status &&
      to.path !== '/prices') {
      next('/prices')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
