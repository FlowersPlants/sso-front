import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/components/Layout'
import Login from '@/views/sys/login'

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
    component: Layout
  },
  {
    path: '/example',
    meta: {title: '使用案例', icon: 'bug'},
    component: Layout,
    children: [
      {
        path: 'svg',
        meta: {title: '图标', icon: 'icon'},
        component: () => import('@/views/example/svg')
      },
      {
        path: 'upload',
        meta: {title: '文件上传', icon: 'upload'},
        component: () => import('@/views/example/upload')
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRouterMap
})
