const nativeRouter = {
  // '/index': {
  //   path: '/index',
  //   component: resolve => require(/* webpackChunkName: "index" */ ['@/views/home/index'], resolve),
  //   name: 'Index',
  //   meta: {
  //     title: '首页',
  //     pageAuth: true
  //   }
  // }, // 首页
  // '/data-view': {
  //   path: '/data-view',
  //   component: resolve => require(/* webpackChunkName: "index" */ ['@/views/data-view/index'], resolve),
  //   redirect: '/data-view/view-free',
  //   name: 'DataView',
  //   meta: {
  //     title: '数据看板',
  //     pageAuth: true,
  //     icon: 'view'
  //   }
  // }, // 数据看板
  // 'view-pay': {
  //   path: 'view-pay',
  //   component: resolve => require(/* webpackChunkName: "index" */ ['@/views/home/index'], resolve),
  //   name: 'ViewPay',
  //   meta: {
  //     title: '付费看板',
  //     pageAuth: true
  //   }
  // }, // 付费看板
  // 'view-free': {
  //   path: 'view-free',
  //   component: resolve => require(/* webpackChunkName: "index" */ ['@/views/data-view/data-view-free'], resolve),
  //   name: 'ViewFree',
  //   meta: {
  //     title: '免费看板',
  //     pageAuth: true
  //   }
  // }, // 免费看板
  // 'view-city': {
  //   path: 'view-city',
  //   component: resolve => require(/* webpackChunkName: "index" */ ['@/views/home/index'], resolve),
  //   name: 'ViewCity',
  //   meta: {
  //     title: '市级管理看板',
  //     pageAuth: true
  //   }
  // }, // 市局看板
  '/gym': {
    path: '/gym',
    component: resolve => require(/* webpackChunkName: "gym-setting" */ ['@/views/gym-setting/index'], resolve),
    redirect: 'noRedirect',
    name: 'GymSetting',
    meta: {
      title: '健身房设置',
      pageAuth: true,
      icon: 'gym'
    }
  }, // 健身房设置
  'gym-setting': {
    path: 'gym-setting',
    component: resolve => require(/* webpackChunkName: "gym-manage" */ ['@/views/gym-setting/gym-manage'], resolve),
    name: 'Gym',
    meta: {
      title: '健身房管理',
      pageAuth: true,
      isHideChildren: true
    }
  }, // 健身房管理
  'gym-equipment': {
    path: 'gym-equipment/:id',
    component: resolve => require(/* webpackChunkName: "gym-equipment" */ ['@/views/gym-setting/gym-manage/GYMEquipment'], resolve),
    name: 'GymEquipment',
    meta: {
      title: '健身房设备信息',
      pageAuth: true,
      activeMenu: '/gym/gym-setting'
    }
  }, // 健身房管理-设施设备
  'gym-access-control': {
    path: 'gym-access-control/:id',
    component: resolve => require(/* webpackChunkName: "gym-access-control" */ ['@/views/gym-setting/gym-manage/GYMAccessControl'], resolve),
    name: 'GymAccessControl',
    meta: {
      title: '门禁设备',
      pageAuth: true,
      activeMenu: '/gym/gym-setting'
    }
  }, // 健身房管理-门禁设备
  'gym-course': {
    path: 'gym-course/:id',
    component: resolve => require(/* webpackChunkName: "gym-course" */ ['@/views/gym-setting/gym-manage/GYMCourse'], resolve),
    name: 'GymCourse',
    meta: {
      title: '课程活动',
      pageAuth: true,
      activeMenu: '/gym/gym-setting'
    }
  }, // 健身房管理-课程活动
  'gym-hardware': {
    path: 'gym-hardware/:id',
    component: resolve => require(/* webpackChunkName: "gym-hardware" */ ['@/views/gym-setting/gym-manage/GYMHardware'], resolve),
    name: 'GymHardware',
    meta: {
      title: '硬件设备',
      pageAuth: true,
      activeMenu: '/gym/gym-setting'
    }
  }, // 健身房管理-硬件设备
  'gym-appointments': {
    path: 'gym-appointments/:id',
    component: resolve => require(/* webpackChunkName: "gym-appointments" */ ['@/views/gym-setting/gym-manage/GYMAppointment'], resolve),
    name: 'GymAppointment',
    meta: {
      title: '预约时段',
      pageAuth: true,
      activeMenu: '/gym/gym-setting'
    }
  }, // 健身房管理-预约时段
  'gym-inout-record': {
    path: 'gym-inout-record',
    component: resolve => require(/* webpackChunkName: "gym-inout-record" */ ['@/views/gym-setting/access-records'], resolve),
    name: 'Access',
    meta: {
      title: '出入记录',
      pageAuth: true
    }
  }, // 出入记录
  'passenger-record': {
    path: 'passenger-record',
    component: resolve => require(/* webpackChunkName: "passenger-record" */ ['@/views/gym-setting/passenger-records'], resolve),
    name: 'Access',
    meta: {
      title: '客流记入',
      pageAuth: true
    }
  }, // 出入记录passenger-record
  'gym-servicer': {
    path: 'gym-servicer',
    component: resolve => require(/* webpackChunkName: "gym-servicer" */ ['@/views/gym-setting/gym-servicer'], resolve),
    name: 'GYMServicer',
    meta: {
      title: '运营商',
      pageAuth: true
    }
  }, // 运营商
  'gym-sport': {
    path: 'gym-sport',
    component: resolve => require(/* webpackChunkName: "gym-sport" */ ['@/views/gym-setting/gym-sport'], resolve),
    name: 'GYMSport',
    meta: {
      title: '运动项配置',
      pageAuth: true
    }
  }, // 运动项配置
  'gym-facility': {
    path: 'gym-facility',
    component: resolve => require(/* webpackChunkName: "gym-facility-setting" */ ['@/views/gym-setting/gym-facility-setting'], resolve),
    name: 'GYMFacility',
    meta: {
      title: '健身房设施配置',
      pageAuth: true
    }
  }, // 健身房设施配置
  '/gym-person': {
    path: '/gym-person',
    redirect: 'noRedirect',
    component: resolve => require(/* webpackChunkName: "gym-person" */ ['@/views/gym-person/index'], resolve),
    name: 'GYMPerson',
    meta: {
      title: '健身人员管理',
      pageAuth: true,
      icon: 'gym-person'
    }
  }, // 健身人员管理
  'gym-person-roster': {
    path: 'gym-person-roster',
    component: resolve => require(/* webpackChunkName: "gym-person-roster" */ ['@/views/gym-person/gym-person-roster'], resolve),
    name: 'GYMPersonRoster',
    meta: {
      title: '健身名单',
      pageAuth: true
    }
  }, // 健身名单
  'gym-person-register': {
    path: 'gym-person-register',
    component: resolve => require(/* webpackChunkName: "gym-person-register" */ ['@/views/gym-person/gym-person-register'], resolve),
    name: 'GYMPersonRoster',
    meta: {
      title: '现场登记',
      pageAuth: true
    }
  }, // 现场登记
  'gym-whitelist': {
    path: 'gym-whitelist',
    component: resolve => require(/* webpackChunkName: "gym-whitelist" */ ['@/views/gym-person/gym-white-person'], resolve),
    name: 'GYMWhitelist',
    meta: {
      title: '白名单登记',
      pageAuth: true
    }
  }, // 现场登记
  '/business': {
    path: '/business',
    redirect: 'noRedirect',
    component: resolve => require(/* webpackChunkName: "gym-person" */ ['@/views/business-manage/index'], resolve),
    name: 'Business',
    meta: {
      title: '业务管理',
      pageAuth: true,
      icon: 'business'
    }
  }, // 业务管理
  order: {
    path: 'order',
    component: resolve => require(/* webpackChunkName: "order-manage" */ ['@/views/business-manage/order-manage'], resolve),
    name: 'Order',
    meta: {
      title: '订单管理',
      pageAuth: true
    }
  }, // 订单管理
  appointment: {
    path: 'appointment',
    component: resolve => require(/* webpackChunkName: "index" */ ['@/views/business-manage/appointment-records'], resolve),
    name: 'Appointment',
    meta: {
      title: '预约记录',
      pageAuth: true
    }
  }, // 预约记录
  card: {
    path: 'card',
    component: resolve => require(/* webpackChunkName: "card-manage" */ ['@/views/business-manage/card-manage'], resolve),
    name: 'Card',
    meta: {
      title: '卡配置',
      pageAuth: true,
      isHideChildren: true
    }
  }, // 卡配置
  'card-add': {
    path: 'card-add',
    component: resolve => require(/* webpackChunkName: "card-manage" */ ['@/views/business-manage/card-manage/CardOperation'], resolve),
    name: 'CardAdd',
    meta: {
      title: '添加会员卡',
      pageAuth: true,
      activeMenu: '/business/card'
    }
  }, // 卡配置
  'card-edit': {
    path: 'card-edit/:id',
    component: resolve => require(/* webpackChunkName: "card-manage" */ ['@/views/business-manage/card-manage/CardOperation'], resolve),
    name: 'CardEdit',
    meta: {
      title: '编辑会员卡',
      pageAuth: true,
      activeMenu: '/business/card'
    }
  }, // 卡配置
  'card-detail': {
    path: 'card-detail/:id',
    component: resolve => require(/* webpackChunkName: "card-manage" */ ['@/views/business-manage/card-manage/CardOperation'], resolve),
    name: 'CardDetail',
    meta: {
      title: '会员卡详情',
      pageAuth: true,
      activeMenu: '/business/card'
    }
  }, // 卡配置
  '/operation': {
    path: '/operation',
    redirect: 'noRedirect',
    component: resolve => require(/* webpackChunkName: "index" */ ['@/views/operate-manage/index'], resolve),
    name: 'OperateManage',
    meta: {
      title: '运营管理',
      pageAuth: true,
      icon: 'operation'
    }
  }, // 运营管理
  complaint: {
    path: 'complaint',
    component: resolve => require(/* webpackChunkName: "index" */ ['@/views/operate-manage/complaint'], resolve),
    name: 'Complaint',
    meta: {
      title: '投诉记录',
      pageAuth: true
    }
  }, // 投诉记录
  notice: {
    path: 'notice',
    component: resolve => require(/* webpackChunkName: "notice" */ ['@/views/operate-manage/notice'], resolve),
    name: 'Notice',
    meta: {
      title: '公告管理',
      pageAuth: true
    }
  }, // 公告管理
  '/system': {
    path: '/system',
    component: resolve => require(/* webpackChunkName: "setting-manage" */ ['@/views/setting-manage/index'], resolve),
    name: 'System',
    meta: {
      title: '系统管理',
      pageAuth: true,
      icon: 'role'
    }
  }, // 系统管理
  user: {
    path: 'user',
    component: resolve => require(/* webpackChunkName: "role-manage" */ ['@/views/setting-manage/user-manage'], resolve),
    name: 'User',
    meta: {
      title: '用户管理',
      pageAuth: true
    }
  }, // 用户管理
  role: {
    path: 'role',
    component: resolve => require(/* webpackChunkName: "role-manage" */ ['@/views/setting-manage/role-manage'], resolve),
    name: 'Role',
    meta: {
      title: '角色管理',
      pageAuth: true
    }
  } // 角色管理
}

export default nativeRouter
