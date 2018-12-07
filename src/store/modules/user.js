import { login as UserLogin, logout } from '@/views/sys/login/api'
import { getUserInfo } from '@/views/sys/user/api'

const user = {
  state: {
    isLogin: false,
    token: undefined,
    info: undefined,
    menus: undefined,
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
        localStorage.setItem('JwtToken', token)
        state.isLogin = true
      } else {
        state.token = undefined
        localStorage.removeItem('JwtToken')
        state.isLogin = false
      }
    }
  },

  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        UserLogin(data).then(({ data }) => {
          commit('SET_ISLOGIN', true)
          commit('SET_TOKEN', data.data)
          resolve()
        }).catch(e => {
          console.log('login error=>', e)
          reject(e)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            if (!response.data) {
              reject(new Error('error'))
            }
            const res = response.data.data
            commit('SET_ROLES', res.roles)
            commit('SET_INFO', res.info)
            commit('SET_MENUS', res.menus)
            resolve(response)
          })
          .catch(error => {
            commit('SET_ISLOGIN', false)
            reject(error)
          })
      })
    },
    ClearToken ({commit}) {
      commit('SET_TOKEN')
    },
    CheckLogin ({ commit }) {
      let token = localStorage.getItem('JwtToken')
      if (token) {
        commit('SET_TOKEN', token)
      } else {
        commit('SET_TOKEN')
      }
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', [])
        // commit('SET_PERMS', [])
        commit('SET_ISLOGIN', false)
        commit('SET_INFO', undefined)
        commit('SET_MENUS', undefined)
        commit('SET_TOKEN', undefined)
        logout().then(() => {
          console.log('logout success.')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
