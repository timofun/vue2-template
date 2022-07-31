import request from '@/utils/request'

/**
 * 登陆
 * @param account 账号
 * @param password 手机号
 * @returns {AxiosPromise} 登录
 */
export function login (account, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      account, password
    }
  })
}

/**
 * 菜单
 * @returns {AxiosPromise}
 */
export function menu () {
  return request({
    url: '/menu/tree/user',
    method: 'get'
  })
}

export function buttonPower () {
  return request({
    url: '/menu/tree/button',
    method: 'get'
  })
}

export function areaDict (pid) {
  return request({
    url: '/region/dict',
    method: 'get',
    params: {
      pid
    }
  })
}

/**
 * 类型获取字典项
 * @param dictType
 * @returns {AxiosPromise}
 */
export function dictDataType (dictType) {
  return request({
    url: `/dictData/type/${dictType}`,
    method: 'get'
  })
}

export function uploadOSSApi (data) {
  return request({
    url: '/aliyun/oss/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

/**
 * 下载白名单模板
 */
export function whiteExportTemplate () {
  return request({
    url: '/gym/whitelist/export',
    method: 'get',
    responseType: 'blob'
  })
}

export function whiteImport (file) {
  const formData = new FormData() // 以表单的形式传递给oss
  formData.append('file', file)
  return request({
    url: '/gym/whitelist/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
