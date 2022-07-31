import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

// // vue-router 3.0+ 版本push和replace返回了promise需要捕获异常，所以统一处理
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)['catch'](err => err)
}

const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location)['catch'](err => err)
}

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */'@/views/login/index'),
    name: '登录',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */'@/views/error-page/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/data-view/view-free',
    children: [
      {
        path: '/user',
        component: () => import(/* webpackChunkName: "user" */'@/views/user/index'),
        name: '个人中心',
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default router
