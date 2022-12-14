import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    guidanceStatus: ''
  },
  mutations: {
    [types.SET_TOGGLE_SIDEBAR] (state, sidebarStatus) {
      state.sidebar.opened = sidebarStatus
    },
    [types.SET_VISITED_VIEWS] (state, view) {
      state.visitedViews = view
    },
    [types.SET_GUIDANCESTATUS_VIEWS] (state, view) {
      state.guidanceStatus = view
    }
  },
  actions: {
    // 切换左侧导航栏
    ToggleSideBar ({ commit, state }) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      commit(types.SET_TOGGLE_SIDEBAR, !state.sidebar.opened)
    },
    // 增加选中tag
    addVisitedViews ({ commit, state }, view) {
      const arr = state.visitedViews.slice()
      const filterArr = arr.filter(v => v.path !== view.path)
      filterArr.push({ name: view.name, path: view.path, isHide: view.meta.hidden })
      commit(types.SET_VISITED_VIEWS, filterArr)
    },
    // 删除选中tag
    delVisitedViews ({ commit, state }, view) {
      let index
      const arr = state.visitedViews.slice()
      for (const [i, v] of arr.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      arr.splice(index, 1)
      return new Promise((resolve) => {
        commit(types.SET_VISITED_VIEWS, arr)
        resolve([...arr])
      })
    }
  }
}

export default app
