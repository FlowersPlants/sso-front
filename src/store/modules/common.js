import CFG from '@/utils/cfg'
import {getDictList} from '@/views/sys/dict/api'

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
        getDictList().then(res => {
          const data = res.data
          if (data) {
            console.log('初始化全局公共数据成功：=> {}', data)
            commit('INIT_DICT', data)
            resolve()
          }
        }).catch(e => reject(e))
      })
    }
  }
}

export default common
