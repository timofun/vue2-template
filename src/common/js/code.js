// 请求接口成功
export const REQ_OK = 200

// 需要退出登录
export const REQ_LOGIN_EXPIRES = [20006, 20047, 20048, 70002, 70003, 70006]

// 单据类型
export const LIST_CODE_TYPE = {
  RECIPIENT: 1, // 领用
  REFUND: 7, // 退还
  ALLOT: 3, // 调拨
  CHANGE: 4, // 变更
  REPAIR: 5, // 维修
  SCRAP: 6, // 处置
  RETURN: 2, // 归还
  BORROW: 8 // 借用
}

// 资产类型
export const ASSET_TYPE = {
  1: '闲置',
  2: '在用',
  3: '已处置',
  4: '维修中',
  5: '借用',
  21: '处置待审',
  22: '调拨待审',
  23: '领用待审',
  24: '退还待审',
  25: '借用待审',
  26: '归还待审',
  27: '维修待审',
  28: '变更待审'
}

export const PUBLEC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxW3FTrRH7fwrtaw0a+YqQ0f+h\n' +
  'M/H3FcrCYj12dGRaiYwvkfvau5fvXPk8q3Hrl3Sqgdr7oTPRVtYcj6QzuTrGtPUZ\n' +
  '4AoClsVv+9OstTm4XosuS19i4yCLh1J8aQPREWx4cMIigM6tREHxH7cVY12IoJmR\n' +
  'DFNcUdH+YH4XtIb3wQIDAQAB\n' +
  '-----END PUBLIC KEY-----'
