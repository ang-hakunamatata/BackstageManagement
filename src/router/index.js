import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'Login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */ '@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
