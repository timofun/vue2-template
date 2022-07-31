/**
 * 权限store
 */
import * as types from '../mutation-types'
import { asyncRouterMap } from '@/router'
import { menu, buttonPower } from '@/api/common'
import nativeRouter from '@/common/js/router'
import { REQ_OK } from '@/common/js/code'
// /**
//  * 平铺任意维度数组
//  * @param arr 任意维度数组
//  * @returns {*[]} 一维数组
//  */
// function flattenArray(arr) {
//   const flattened = [].concat(...arr)
//   return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened
// }
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 后端返回的权限路由数组
 * @param nativeRouter 本地配置的路由json
 * @returns {*} 符合用户权限的路由
 */
function filterAsyncRouter (asyncRouterMap, nativeRouter) {
  const route = []
  asyncRouterMap.forEach(item => {
    // 判断是否有子路由，如果存在，那么递归此函数
    // 判断本地是否已经配置组件，如果存在，那把组件加进路由
    // eslint-disable-next-line no-prototype-builtins
    if (nativeRouter.hasOwnProperty(item.path)) {
      const tem = nativeRouter[item.path]
      tem.meta.title = item.name
      if (item.children && item.children.length) {
        tem.children = filterAsyncRouter(item.children, nativeRouter)
      }
      route.push(tem)
    }
  })
  return route
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    buttonPower: [],
    accountExpires: false
  },
  mutations: {
    [types.SET_ROUTERS] (state, routers) {
      state.routers = routers
    },
    [types.SET_ADD_ROUTERS] (state, routers) {
      state.addRouters = routers
    },
    [types.SET_BUTTON_POWER] (state, buttonPower) {
      state.buttonPower = buttonPower
    },
    [types.SET_ACCOUNT_EXPIRES] (state, accountExpires) {
      state.accountExpires = accountExpires
    }
  },
  actions: {
    // 后端获取权限菜单
    GenerateRoutes ({ commit, state }) {
      return new Promise((resolve, reject) => {
        menu().then(async res => {
          if (res.data.code === REQ_OK) {
            const routeData = res.data.data
            // 动态路由和本地路由匹配，最终返回需要的权限路由
            const routes = filterAsyncRouter(routeData, nativeRouter)
            // 过滤一次，删掉不需要的展示的router
            const resultRouter = removeChildRouter(routes)
            commit(types.SET_ROUTERS, resultRouter)
            const { data } = await buttonPower()
            commit(types.SET_BUTTON_POWER, data.data)
            // 将返回的权限路由加进异步的第一个路由子类
            asyncRouterMap[0].children = asyncRouterMap[0].children.concat(routes)
            resolve(asyncRouterMap)
          } else {
            resolve([])
          }
        })['catch'](error => {
          reject(error)
        })
      })
    }
  }
}

// 删除不需要展示的router
function removeChildRouter (arr) {
  const cloneRoute = JSON.parse(JSON.stringify(arr))
  return cloneRoute.map(item => {
    if (!item.meta.isHideChildren && item.children && item.children.length) {
      item.children = removeChildRouter(item.children)
    } else {
      delete item.children
    }
    return item
  })
}

export default permission
