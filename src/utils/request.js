import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import {
  REQ_LOGIN_EXPIRES,
  REQ_OK
} from '@/common/js/code'
import customBaseConfig from '@/utils/config'
import router from '@/router'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: customBaseConfig[process.env.NODE_ENV].baseURL, // api的base_url
  // baseURL: '/api', // api的base_url
  timeout: 30000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  // config.withCredentials = true
  if (getToken()) {
    config.headers.Authorization = getToken()
  }
  if (config.method.toLowerCase() === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// response拦截器
service.interceptors.response.use(
  res => {
    if (res.data.code && res.data.code !== REQ_OK) {
      Message.error(res.data.message)
      if (REQ_LOGIN_EXPIRES.includes(res.data.code)) {
        setTimeout(() => {
          store.dispatch('LogOut').then(() => {
            router.replace({
              path: '/login'
            })
          })
        }, 2000)
      }
    }
    return res
  },
  error => {
    if (error.response) {
      const res = error.response.data
      Message.error(res.message)
      if (res.code !== REQ_OK) {
        if (REQ_LOGIN_EXPIRES.includes(res.code)) {
          setTimeout(() => {
            store.dispatch('LogOut').then(() => {
              router.replace({
                path: '/login'
              })
            })
          }, 2000)
        }
      }
      return error.response
    } else {
      Message.error('网络异常，请重试~')
    }
    return Promise.reject(error)
  }
)

export default service
