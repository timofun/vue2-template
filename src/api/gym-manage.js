import request from '@/utils/request'

/**
 * 获取健身房分页列表
 */
export function gymPage (params, pageInfo) {
  return request({
    url: '/gym/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 健身房统计
 */
export function getGymStatistics () {
  return request({
    url: '/gym/statistics',
    method: 'get'
  })
}

/**
 * 获取健身房详情
 * @param id
 */
export function getGymDetail (id) {
  return request({
    url: `/gym/${id}`,
    method: 'get'
  })
}

/**
 * 修改健身房详情
 * @param item
 */
export function editGym (item) {
  return request({
    url: '/gym',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 新增健身房
 * @param item
 */
export function addGym (item) {
  return request({
    url: '/gym',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 是否开放预约
 * @param item
 */
export function gymAppointment (item) {
  return request({
    url: '/gym/appointment',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 是否上架
 * @param item
 */
export function gymSell (item) {
  return request({
    url: '/gym/sell',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除健身房
 * @param id
 */
export function delGym (id) {
  return request({
    url: '/gym',
    method: 'delete',
    data: [id]
  })
}

/**
 * 运动配置项列表分页
 * @param params
 * @param pageInfo
 */
export function gymSportPage (params, pageInfo) {
  return request({
    url: '/gym/sport/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 获取运动项详情
 * @param id
 */
export function getGymSportDetail (id) {
  return request({
    url: `/gym/sport/${id}`,
    method: 'get'
  })
}

/**
 * 新增运动项配置
 * @param item
 */
export function addGymSport (item) {
  return request({
    url: '/gym/sport',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑运动项
 * @param item
 */
export function editGymSport (item) {
  return request({
    url: '/gym/sport',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 健身房设施列表分页
 * @param params
 * @param pageInfo
 */
export function gymFacilitySettingPage (params, pageInfo) {
  return request({
    url: '/gym/facility/setting/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 获取健身房设施详情
 * @param id
 */
export function getGymFacilitySettingDetail (id) {
  return request({
    url: `/gym/facility/setting/${id}`,
    method: 'get'
  })
}

/**
 * 新增健身房设施配置
 * @param item
 */
export function addGymFacilitySetting (item) {
  return request({
    url: '/gym/facility/setting',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑健身房设施
 * @param item
 */
export function editGymFacilitySetting (item) {
  return request({
    url: '/gym/facility/setting',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 运营商列表分页
 * @param params
 * @param pageInfo
 */
export function gymServicerPage (params, pageInfo) {
  return request({
    url: '/gym/servicer/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 获取运营商详情
 * @param id
 */
export function getGymServicerDetail (id) {
  return request({
    url: `/gym/servicer/${id}`,
    method: 'get'
  })
}

/**
 * 新增运营商配置
 * @param item
 */
export function addGymServicer (item) {
  return request({
    url: '/gym/servicer',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑运营商
 * @param item
 */
export function editGymServicer (item) {
  return request({
    url: '/gym/servicer',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 健身房列表字典
 */
export function gymDict () {
  return request({
    url: '/gym/dict',
    method: 'get'
  })
}

/**
 * 运动项字典
 */
export function gymSportDict () {
  return request({
    url: '/gym/sport/dict',
    method: 'get'
  })
}

/**
 * 健身房管理-出入记录列表
 * @param params
 * @param pageInfo
 */
export function gymPassLogPage (params, pageInfo) {
  return request({
    url: '/gym/passLog/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 健身房设置-预约时段列表
 * @param gymId
 * @param pageInfo
 */
export function gymAppointmentPage (gymId, pageInfo) {
  return request({
    url: '/gym/appointment/setting/page',
    method: 'get',
    params: {
      gymId,
      ...pageInfo
    }
  })
}

/**
 * 获取预约时段详情
 * @param id
 */
export function getGymAppointmentDetail (id) {
  return request({
    url: `/gym/appointment/setting/${id}`,
    method: 'get'
  })
}

export function getAppointmentSettingGym (gymId) {
  return request({
    url: `/gym/appointment/setting/gym/${gymId}`,
    method: 'get'
  })
}

export function gymAppointmentSettingGym (item) {
  return request({
    url: '/gym/appointment/setting/gym',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除预约时段
 * @param id
 * @returns {AxiosPromise}
 */
export function delAppointmentSettingGym (id) {
  return request({
    url: '/gym/appointment/setting',
    method: 'delete',
    data: [id]
  })
}

/**
 * 新增预约时段
 * @param item
 */
export function addGymAppointment (item) {
  return request({
    url: '/gym/appointment/setting',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑预约时段
 * @param item
 */
export function editGymAppointment (item) {
  return request({
    url: '/gym/appointment/setting',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 健身房设置-门禁设备列表
 * @param query
 * @param pageInfo
 */
export function gymPassDevicePage (query, pageInfo) {
  return request({
    url: '/gym/passDevice/page',
    method: 'get',
    params: {
      ...query,
      ...pageInfo
    }
  })
}

/**
 * 获取门禁设备详情
 * @param id
 */
export function getGymPassDeviceDetail (id) {
  return request({
    url: `/gym/passDevice/${id}`,
    method: 'get'
  })
}

/**
 * 新增门禁设备
 * @param item
 */
export function addGymPassDevice (item) {
  return request({
    url: '/gym/passDevice',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑门禁设备
 * @param item
 */
export function editGymPassDevice (item) {
  return request({
    url: '/gym/passDevice',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除门禁设备
 * @param id
 */
export function delGymPassDevice (id) {
  return request({
    url: '/gym/passDevice',
    method: 'delete',
    data: [id]
  })
}

/**
 * 健身房设置-硬件设备列表
 * @param gymId
 * @param pageInfo
 */
export function gymRegionPage (gymId, pageInfo) {
  return request({
    url: '/gym/region/page',
    method: 'get',
    params: {
      gymId,
      ...pageInfo
    }
  })
}

/**
 * 获取硬件设备详情
 * @param id
 */
export function getGymRegion (id) {
  return request({
    url: `/gym/region/${id}`,
    method: 'get'
  })
}

/**
 * 新增硬件设备
 * @param item
 */
export function addGymRegion (item) {
  return request({
    url: '/gym/region',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑硬件设备
 * @param item
 */
export function editGymRegion (item) {
  return request({
    url: '/gym/region',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除硬件设备
 * @param id
 */
export function delGymRegion (id) {
  return request({
    url: '/gym/region',
    method: 'delete',
    data: [id]
  })
}

/**
 * 健身房设置-设备信息列表
 * @param params
 * @param pageInfo
 */
export function gymFacilityPage (params, pageInfo) {
  return request({
    url: '/gym/facility/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 获取设备信息详情
 * @param id
 */
export function getGymFacility (id) {
  return request({
    url: `/gym/facility/${id}`,
    method: 'get'
  })
}

/**
 * 新增设备信息
 * @param item
 */
export function addGymFacility (item) {
  return request({
    url: '/gym/facility',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑设备信息
 * @param item
 */
export function editGymFacility (item) {
  return request({
    url: '/gym/facility',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除设备信息
 * @param id
 */
export function delGymFacility (id) {
  return request({
    url: '/gym/facility',
    method: 'delete',
    data: [id]
  })
}

/**
 * 设施设备字典项
 */
export function getGymFacilitySettingDict () {
  return request({
    url: '/gym/facility/setting/dict',
    method: 'get'
  })
}


/**
 * 健身房设置-课程列表
 * @param params
 * @param pageInfo
 */
export function gymClassPage (params, pageInfo) {
  return request({
    url: '/gym/class/page',
    method: 'get',
    params: {
      ...params,
      ...pageInfo
    }
  })
}

/**
 * 获取课程详情
 * @param id
 */
export function getGymClass (id) {
  return request({
    url: `/gym/class/${id}`,
    method: 'get'
  })
}

/**
 * 新增课程
 * @param item
 */
export function addGymClass (item) {
  return request({
    url: '/gym/class',
    method: 'post',
    data: {
      ...item
    }
  })
}

/**
 * 编辑课程
 * @param item
 */
export function editGymClass (item) {
  return request({
    url: '/gym/class',
    method: 'put',
    data: {
      ...item
    }
  })
}

/**
 * 删除课程
 * @param id
 */
export function delGymClass (id) {
  return request({
    url: '/gym/class',
    method: 'delete',
    data: [id]
  })
}

/**
 * 运营商字典-根据健身房获取运营商
 * @param gymId
 */
export function gymServicerDict (gymId) {
  return request({
    url: '/gym/servicer/dict',
    method: 'get',
    params: {
      gymId
    }
  })
}

