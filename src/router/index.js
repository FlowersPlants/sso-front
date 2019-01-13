import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/components/Layout'
import Login from '@/views/login'

Vue.use(Router)

/**
 * 静态路由配置
 * 暂目前静态路由还有问题，此路由配置没有使用
 */
export const constRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/login',
    hidden: true,
    component: Login
  },
  {
    path: '/home',
    meta: {title: '首页', icon: 'dashboard'},
    component: Layout
  }
]

/**
 * 动态路由配置时，除了公共路由外，其他路由从$store.getters.addRouters获取
 */
export const asyncRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/login',
    hidden: true,
    component: Login
  },
  {
    path: '/home',
    meta: {title: '首页', icon: 'dashboard'},
    component: Layout
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRouterMap
})
