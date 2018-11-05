import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/views/sys/login/index'

Vue.use(Router)

// 默认创建路由的方式
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: Login
//     }
//   ]
// })

/**
 * 静态路由配置
 */
export const constRouterMap = [
  {
    path: '/404',
    meta: { icon: '404', name: '404' },
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    meta: { icon: 'bug', name: '401' },
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/', // 登录页面
    hidden: true,
    component: Login
  },
  {
    path: '/home',
    component: Layout,
    name: 'home'
  }
]

/**
 * 动态路由配置，目前不使用此方式，后期从后端获取
 */
export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouterMap
})
