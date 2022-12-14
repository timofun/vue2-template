import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import asset from './modules/asset'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    asset
  },
  getters,
  // strict: debug,  // 加了严格模式动态挂载路由会报错，但不影响功能
  plugins: debug ? [createLogger()] : []
})

export default store
