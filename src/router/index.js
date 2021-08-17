import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index.js'

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
    // 直接给某个路由设置，这是内部的子路由都需要认证（包含当前路由）
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 Vuex 的 store 中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({ name: 'login' })
    }
    next()
  } else {
    next() // 确保一定要调用 next()
  }
  // console.log(to, from)
  // next()
})

export default router
