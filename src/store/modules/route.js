import { constRouterMap } from '@/router'
import Layout from '@/components/Layout'

/**
 * 递归生成路由表
 */
function buildByRecursive (menus, root) {
  let routers = []
  if (menus && menus.length) {
    menus.forEach(it => {
      let temp = {}
      if (it.type === 0) {
        // 目录
        if (!it.uri) {
          it.uri = ''
        }
        temp.path = it.uri
        if (it.ext2 === 'Layout') {
          temp.component = Layout
        } else if (it.ext2) {
          temp.component = () => import(`@/views/${it.ext2}`)
        } else {
          temp.component = Layout
        }
        temp.redirect = 'noredirect'
        temp.meta = { title: it.title, icon: it.icon }
        temp.hidden = it.ext4 ? it.ext4 === 1 : false
        if (it.children && it.children.length) {
          if (it.children.length > 1) {
            temp.name = it.code
          }
          temp.children = buildByRecursive(it.children, false)
        }
      } else if (it.type === 1) {
        // 菜单
        if (root) {
          // 生成一个目录
          if (!it.uri) {
            it.uri = ''
          }
          temp.path = '' // it.uri 双层url了
          temp.component = Layout
          temp.redirect = 'noredirect'
          temp.meta = { title: it.title, icon: it.icon }
          temp.hidden = it.ext4 ? it.ext4 === 1 : false
          if (it.uri && it.uri.startsWith('/')) {
            it.uri = it.uri.substring(1, it.uri.length)
          }
          temp.children = [
            {
              path: it.uri,
              component: () => import(`@/views/${it.ext2}`),
              name: it.uri,
              hidden: it.ext4 ? it.ext4 === 1 : false,
              meta: {
                title: it.title,
                icon: it.icon,
                keepAlive: !!(it.ext3 && it.ext3 === 1)
              }
            }
          ]
        } else {
          // 菜单
          if (it.uri && it.uri.startsWith('/')) {
            it.uri = it.uri.substring(1, it.uri.length)
          }
          temp.path = it.uri
          temp.component = () => import(`@/views/${it.ext2}`)
          temp.name = it.code
          temp.hidden = it.ext4 ? it.ext4 === 1 : false
          temp.meta = {
            title: it.title,
            icon: it.icon,
            keepAlive: !!(it.ext3 && it.ext3 === 1)
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
    routers: constRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constRouterMap.concat(routers)
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
