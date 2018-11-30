import router from '@/router'
import store from '@/store'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import CFG from '@/utils/cfg'
import { initUserRouter } from '@/store/actions/sys'

// NProgress.configure({showSpinner: false});// NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // NProgress.start(); // start progress bar

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
      console.log('未登录，跳转到登陆界面。')
      next({ path: '/login' })
    }
  } else if (!store.getters.userInfo) {
    initUserRouter(to, from, next)
  } else {
    // if (store.getters.isLock && to.path !== '/lock') {
    //   next({ path: '/lock' })
    // } else {
    next()
    // }
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})

console.log('store=>', store)

store.dispatch('CheckLogin')
