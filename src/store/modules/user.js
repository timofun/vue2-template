/* eslint-disable prefer-promise-reject-errors */
/**
 * 用户store
 */
import { removeToken } from '@/utils/auth'
import * as types from '../mutation-types'
import { personDetail } from '@/api/user'
import { REQ_OK } from '@/common/js/code'
import { resetRouter } from '@/router'
const user = {
  state: {
    userInfo: {}
  },

  mutations: {
    [types.SET_USERINFO] (state, userInfo) {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        personDetail().then(response => {
          if (response.data.code === REQ_OK) {
            commit(types.SET_USERINFO, response.data.data)
            resolve(response)
          } else {
            resolve('error')
          }
        })['catch'](() => {
          reject()
        })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.SET_ROUTERS, [])
        removeToken()
        resetRouter()
        resolve()
      })
    }
  }
}

export default user
