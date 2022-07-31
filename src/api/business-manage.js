/**
 * @Description 业务管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/5/3 6:28 下午
 */
import request from '@/utils/request'

/**
 * 获取会员卡分页列表
 */
export function gymCardPage (params, pageInfo) {
  return request({
    url: '/gym/card/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}


/**
 * 获取会员卡详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getGymCardDetail (id) {
  return request({
    url: `/gym/card/${id}`,
    method: 'get'
  })
}

/**
 * 修改会员卡详情
 * @param item
 */
export function editGymCard (item) {
  return request({
    url: '/gym/card',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 修改会员卡详情-上架/下架
 * @param item
 */
export function editGymCardSale (item) {
  return request({
    url: '/gym/card/sale',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 新增会员卡
 * @param item
 * @returns {AxiosPromise}
 */
export function addGymCard (item) {
  return request({
    url: '/gym/card',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 删除卡
 * @param ids
 * @returns {AxiosPromise}
 */
export function delGymCard (ids) {
  return request({
    url: '/gym/card',
    method: 'delete',
    data: ids
  })
}

/**
 * 获取订单分页列表
 */
export function gymOrderPage (params, pageInfo) {
  return request({
    url: '/gym/order/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}


/**
 * 获取订单详情
 * @param id
 */
export function getGymOrderDetail (id) {
  return request({
    url: `/gym/order/${id}`,
    method: 'get'
  })
}

/**
 * 订单统计
 */
export function getGymOrderStatistics () {
  return request({
    url: '/gym/order/statistics',
    method: 'get'
  })
}

/**
 * 删除订单
 * @param ids
 */
export function delGymOrder (ids) {
  return request({
    url: '/gym/order',
    method: 'delete',
    data: ids
  })
}

/**
 * 退款
 * @param data
 */
export function orderRefund (data) {
  return request({
    url: '/gym/order/refund',
    method: 'post',
    data: {
      ...data
    }
  })
}

/**
 * 订单管理-出入记录
 * @param orderId
 * @param pageInfo
 */
export function orderPassLog (orderId, pageInfo) {
  return request({
    url: '/gym/order/passLog',
    method: 'get',
    params: {
      orderId,
      ...pageInfo
    }
  })
}

/**
 * 获取预约记录分页列表
 */
export function gymAppointmentPage (params, pageInfo) {
  return request({
    url: '/gym/appointment/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

export function appointmentCancel (id) {
  return request({
    url: '/gym/appointment/cancel',
    method: 'put',
    data: {
      id
    }
  })
}

export function gymPassengerFlowPage (params, pageInfo) {
  return request({
    url: '/gym/passengerFlow/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}
