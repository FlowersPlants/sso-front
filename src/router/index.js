import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
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
  },
  {
    path: '/sys',
    name: 'sys',
    meta: {
      title: '系统管理',
      icon: 'setting'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'service'
        },
        component: () => import('@/views/sys/user')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: 'menu'
        },
        component: () => import('@/views/sys/menu')
      },
      {
        path: 'role',
        name: 'menu',
        meta: {
          title: '角色管理',
          icon: ''
        },
        component: () => import('@/views/sys/role')
      }
    ]
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
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRouterMap
})
