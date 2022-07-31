import request from '@/utils/request'

/**
 * 查询角色列表
 * @returns {AxiosPromise}
 */
export function roleList (params, pageInfo) {
  return request({
    url: '/role/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 当前角色权限数组
 * @param roleId  角色id
 * @returns {AxiosPromise}
 */
export function roleSettingDetail (roleId) {
  return request({
    url: `/role/setting/${roleId}`,
    method: 'get'
  })
}

/**
 * 获取权限树
 * @returns {AxiosPromise}
 */
export function menuTreeAll () {
  return request({
    url: '/menu/tree/all',
    method: 'get'
  })
}

export function roleDict (roleType) {
  return request({
    url: '/role/dict',
    method: 'get',
    params: {
      roleType
    }
  })
}

export function addRole (roleData) {
  return request({
    url: '/role',
    method: 'post',
    data: {
      ...roleData
    }
  })
}

export function roleDetail (id) {
  return request({
    url: `/role/${id}`,
    method: 'get'
  })
}

export function editRole (roleData) {
  return request({
    url: '/role',
    method: 'put',
    data: {
      ...roleData
    }
  })
}

export function delRole (id) {
  return request({
    url: '/role',
    method: 'delete',
    data: [id]
  })
}

export function userList (params, pageInfo) {
  return request({
    url: '/user/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

export function userStatus (item) {
  return request({
    url: '/user/status',
    method: 'put',
    data: {
      ...item
    }
  })
}

export function delUser (id) {
  return request({
    url: '/user',
    method: 'delete',
    data: [id]
  })
}

export function addUser (roleData) {
  return request({
    url: '/user',
    method: 'post',
    data: {
      ...roleData
    }
  })
}

export function userDetail (id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function editUser (roleData) {
  return request({
    url: '/user',
    method: 'put',
    data: {
      ...roleData
    }
  })
}
