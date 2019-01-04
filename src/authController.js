import router from '@/router'
import store from '@/store'
import CFG from '@/utils/cfg'
import { initUserRouter } from '@/store/actions/sys'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  const meta = to.meta
  // const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : meta.title

  // 修改title
  if (label) {
    if (meta) {
      if (meta.suffix) {
        document.title = `${label} - ${meta.suffix}`
      } else {
        document.title = `${label} - ${CFG.WEB_INFO.SITE_TITLE}`
      }
    } else {
      document.title = label
    }
  } else {
    document.title = CFG.WEB_INFO.SITE_TITLE
  }

  // // tags
  // if (whiteList.indexOf(value) === -1) {
  //   store.commit('ADD_TAG', {
  //     label,
  //     value,
  //     query: to.query
  //   })
  // }

  if (!store.getters.isLogin) {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else if (!store.getters.userInfo) {
    initUserRouter(to, from, next)
  } else {
    next()
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})

console.log('store => {}', store)
store.dispatch('CheckLogin')
