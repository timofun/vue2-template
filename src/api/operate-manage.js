/**
 * @Description 运营管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/5/3 6:29 下午
 */
import request from '@/utils/request'

/**
 * 获取公告分页列表
 */
export function gymNoticePage (params, pageInfo) {
  return request({
    url: '/gym/notice/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}


/**
 * 获取公告详情
 * @param id
 */
export function getGymNoticeDetail (id) {
  return request({
    url: `/gym/notice/${id}`,
    method: 'get'
  })
}

/**
 * 修改公告详情
 * @param item
 */
export function editGymNotice (item) {
  return request({
    url: '/gym/notice',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 新增公告
 * @param item
 */
export function addGymNotice (item) {
  return request({
    url: '/gym/notice',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 删除公告
 * @param ids
 */
export function delGymNotice (ids) {
  return request({
    url: '/gym/notice',
    method: 'delete',
    data: ids
  })
}

/**
 * 获取投诉记录分页列表
 */
export function gymComplaintPage (params, pageInfo) {
  return request({
    url: '/gym/complaint/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}


/**
 * 获取投诉详情
 * @param id
 */
export function getGymComplaintDetail (id) {
  return request({
    url: `/gym/complaint/${id}`,
    method: 'get'
  })
}

/**
 * 投诉记录进度处理
 * @param item
 */
export function editGymComplaintProgress (item) {
  return request({
    url: '/gym/complaint/progress',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除投诉
 * @param ids
 */
export function delGymComplaint (ids) {
  return request({
    url: '/gym/complaint',
    method: 'delete',
    data: ids
  })
}

/**
 * 投诉记录统计
 */
export function gymComplaintStatistics () {
  return request({
    url: '/gym/complaint/statistics',
    method: 'get'
  })
}
