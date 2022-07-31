import * as types from '../mutation-types'

const asset = {
  state: {
    printAssetIds: [],
    watchCurrentControlRefresh: '',
    allocationCompanyId: ''
  },
  mutations: {
    [types.SET_PRINT_ASSET_IDS] (state, ids) {
      state.printAssetIds = ids
    },
    [types.SET_WATCH_CURRENT_CONTROL] (state, currentControl) {
      state.watchCurrentControlRefresh = currentControl
    },
    [types.SET_ALLOCATION_COMPANY_ID] (state, id) {
      state.allocationCompanyId = id
    }
  },
  actions: {
    setPrintAssetIds ({ commit, state }, ids) {
      commit(types.SET_PRINT_ASSET_IDS, ids)
    }
  }
}

export default asset
