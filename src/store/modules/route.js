import { asyncRouterMap } from '@/router'
import Layout from '@/components/Layout'

/**
 * 递归生成路由表
 */
function buildByRecursive (menus, root) {
  let routers = []
  if (menus && menus.length) {
    menus.forEach(it => {
      let temp = {}
      if (it.type === '0') {
        if (!it.url) {
          it.url = ''
        }
        temp.path = it.url
        if (it.href === 'Layout') {
          temp.component = Layout
        } else if (it.href) {
          temp.component = () => import(`@/views/${it.href}`)
        } else {
          temp.component = Layout
        }
        temp.redirect = 'noredirect'
        temp.meta = { title: it.name, icon: it.icon }
        temp.hidden = it.show === false
        if (it.children && it.children.length) {
          if (it.children.length > 1) {
            temp.name = it.code
          }
          temp.children = buildByRecursive(it.children, false)
        }
      } else if (it.type === '1') {
        if (root) {
          if (!it.url) {
            it.url = ''
          }
          temp.path = '' // it.url 双层url了
          temp.component = Layout
          temp.redirect = 'noredirect'
          temp.meta = { title: it.name, icon: it.icon }
          temp.hidden = it.show === false
          if (it.url && it.url.startsWith('/')) {
            it.url = it.url.substring(1, it.url.length)
          }
          temp.children = [
            {
              path: it.url,
              component: () => import(`@/views/${it.href}`),
              name: it.code,
              hidden: it.show === false,
              meta: {
                title: it.name,
                icon: it.icon,
                keepAlive: true
              }
            }
          ]
        } else {
          if (it.url && it.url.startsWith('/')) {
            it.url = it.url.substring(1, it.url.length)
          }
          temp.path = it.url
          temp.component = () => import(`@/views/${it.href}`)
          temp.name = it.code
          temp.hidden = it.show === false
          temp.meta = {
            title: it.name,
            icon: it.icon,
            // keepAlive: !!(it.ext3 && it.ext3 === 1)
            keepAlive: true
          }
        }
      }
      routers.push(temp)
    })
  }
  return routers
}

const route = {
  state: {
    routers: asyncRouterMap, // 前端静态路由
    addRouters: [] // 后端动态添加路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = asyncRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, menus) {
      return new Promise(resolve => {
        // 将后端菜单列表转换为前端路由
        let accessedRouters = buildByRecursive(menus, true)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default route
