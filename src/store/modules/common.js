import CFG from '@/utils/cfg'
import { findList } from '@/views/sys/dict/api'

const common = {
  state: {
    webInfo: CFG.WEB_INFO,
    isInit: false,
    dict: []
  },
  mutations: {
    INIT_DICT (state, data) {
      state.dict = data
      state.isInit = true
    }
  },
  actions: {
    initDict ({commit}) {
      return new Promise((resolve, reject) => {
        findList()
          .then(res => {
            commit('INIT_DICT', res.data.data)
            resolve()
          })
          .catch(e => reject(e))
      })
    }
  }
}

export default common
