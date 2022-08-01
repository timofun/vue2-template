import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
export function personDetail () {
  return request({
    url: '/pc/personDetail',
    method: 'get'
  })
}
