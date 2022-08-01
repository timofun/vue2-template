/**
 * 路由跳转权限
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
// register global progress.
const whiteList = ['/login', '/404']// 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启Progress
  if (getToken()) { // 判断是否有token
    if (to.path === '/login' || whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案
    } else {
      if (store.getters.routers.length) {
        next()
      } else {
        try {
          const userRes = await store.dispatch('GetUserInfo')
          if (userRes === 'error') return NProgress.done()
          const routesRes = await store.dispatch('GenerateRoutes')
          // 动态添加可访问路由表
          router.addRoutes(routesRes)
          // 这样可以保证打印的路由是完整的，不然动态添加的是无法打印的
          router.options.routes.push(routesRes)
          // hack方法 确保addRoutes已完成
          next({ ...to, replace: true })
        } catch (error) {
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
