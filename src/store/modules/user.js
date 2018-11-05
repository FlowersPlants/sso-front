import {login as UserLogin, logout} from '@/views/sys/login/api'

const user = {
  state: {
    isLogin: undefined,
    token: undefined,
    info: undefined,
    menus: [],
    roles: []
  },

  mutations: {
    SET_ISLOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_TOKEN: (state, token) => {
      if (token) {
        state.token = token
        localStorage.setItem('DbToken', token)
        state.isLogin = true
      } else {
        state.token = undefined
        localStorage.removeItem('DbToken')
        state.isLogin = false
      }
    }
  },

  actions: {
    login ({commit}, data) {
      return new Promise((resolve, reject) => {
        UserLogin(data).then(({data}) => {
          console.log('login resp  ', data)
          commit('SET_ISLOGIN', true)
          commit('SET_TOKEN', data.data)
          resolve()
        }).catch(e => {
          console.log('login error=>', e)
          reject(e)
        })
      })
    },
    // // 获取用户信息
    // GetUserInfo ({commit}) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo()
    //       .then(response => {
    //         if (!response.data) {
    //           // 由于mockjs 不支持自定义状态码只能这样hack
    //           // reject('error')
    //           reject(new Error('error'))
    //         }
    //         const res = response.data.data
    //         commit('SET_ROLES', res.roles)
    //         commit('SET_INFO', res.info)
    //         commit('SET_MENUS', res.menus)

    //         if (res.perms) {
    //           const codeList = res.perms.map(it => {
    //             return it.code
    //           })
    //           commit('SET_PERMS', codeList)
    //         }

    //         resolve(response)
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },
    CheckLogin ({commit}) {
      let token = localStorage.getItem('DbToken')
      if (token) {
        commit('SET_TOKEN', token)
      } else {
        commit('SET_TOKEN')
      }
    },
    // 登出
    LogOut ({commit}) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_ROLES', [])
            // commit('SET_PERMS', [])
            commit('SET_ISLOGIN', false)
            commit('SET_INFO', undefined)
            commit('SET_MENUS', undefined)
            // removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
