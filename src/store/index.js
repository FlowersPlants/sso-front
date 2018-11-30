import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import route from './modules/route'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    route,
    common
  },
  getters
})

export default store
