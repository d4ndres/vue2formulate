import Vue from 'vue'
import VueRouter from 'vue-router'
import routesForms from '@/router/routesForms.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/forms'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routesForms, ...routes ]
})

export default router
