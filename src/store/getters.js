const getters = {
  // user
  userInfo: state => state.user.info,
  userMenus: state => state.user.menus,
  // userPerm: state => state.user.permCodes,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  roles: state => state.user.roles
}

export default getters
