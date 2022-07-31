import request from '@/utils/request'

/**
 * 查询健身名单列表
 */
export function gymPersonPage (params, pageInfo) {
  return request({
    url: '/cust/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 健身人员详情
 * @param id
 */
export function gymPersonDetail (id) {
  return request({
    url: `/cust/${id}`,
    method: 'get'
  })
}

/**
 * 预约详情
 * @param params
 * @param pageInfo
 */
export function gymPersonAppointment (params, pageInfo) {
  return request({
    url: '/cust/custAppointment',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 会员卡详情
 * @param params
 * @param pageInfo
 */
export function gymPersonCard (params, pageInfo) {
  return request({
    url: '/cust/custCard',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 现场登记
 * @param params
 * @param pageInfo
 */
export function gymPersonRegisterPage (params, pageInfo) {
  return request({
    url: '/gym/register/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 白名单
 * @param params
 * @param pageInfo
 */
export function gymWhitelistPage (params, pageInfo) {
  return request({
    url: '/gym/whitelist/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

export function addGymWhitelistPage (item) {
  return request({
    url: '/gym/whitelist',
    method: 'post',
    data: {
      ...item
    }
  })
}

export function editGymWhitelistPage (item) {
  return request({
    url: '/gym/whitelist',
    method: 'put',
    data: {
      ...item
    }
  })
}

export function gymWhitelistDetail (id) {
  return request({
    url: `/gym/whitelist/${id}`,
    method: 'get'
  })
}

/**
 * 删除白名单
 * @param id
 */
export function delGymWhitelistPage (id) {
  return request({
    url: '/gym/whitelist',
    method: 'delete',
    data: [id]
  })
}

/**
 * 删除现场登记
 * @param id
 */
export function delGymRegister (id) {
  return request({
    url: '/gym/register',
    method: 'delete',
    data: [id]
  })
}


export function gymRegisterDetail (id) {
  return request({
    url: `/gym/register/${id}`,
    method: 'get'
  })
}

export function editGymRegisterPage (item) {
  return request({
    url: '/gym/register',
    method: 'put',
    data: {
      ...item
    }
  })
}


export function addGymRegisterPage (item) {
  return request({
    url: '/gym/register',
    method: 'post',
    data: {
      ...item
    }
  })
}
