import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'

/**
 * 初始化全局公共数据（字典）
 */
function initGlobalData () {
  if (!store.getters.sysInit) {
    return Promise.all([
      store.dispatch('initDict')
    ])
  } else {
    return new Promise(resolve => {
      resolve()
    })
  }
}

export function initUserRouter (to, form, next) {
  if (!store.getters.userInfo) {
    store.dispatch('GetUserInfo').then(() => {
      store.dispatch('GenerateRoutes', store.getters.userMenus).then(() => {
        router.addRoutes(store.getters.addRouters)
        next({...to, replace: true})
        initGlobalData().then(() => {
          next({...to, replace: true})
        }).catch(() => {
          this.$notify({
            type: 'error',
            message: '初始化数据失败，可能影响正常使用！'
          })
          next({...to, replace: true})
        })
      })
    }).catch(() => {
      MessageBox.alert(`获取用户信息失败,请重新登陆!`, `错误`, {
        confirmButtonText: '登录',
        showCancelButton: false,
        showClose: false,
        type: 'error'
      }).then(() => {
        next('/login')
      })
    })
  } else {
    // 加载公共数据
  }
}
