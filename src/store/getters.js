const getters = {
  // common
  webInfo: state => state.common.webInfo,
  dict: state => state.common.dict,
  sysInit: state => state.common.isInit,
  // user
  userInfo: state => state.user.info,
  userMenus: state => state.user.menus,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // route
  menus: state => state.route.routers,
  addRouters: state => state.route.addRouters
}

export default getters
