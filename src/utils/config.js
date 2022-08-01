/**
 * @Author QINGYU FAN
 * @Version
 * @Description 获取本地环境配置
 * @date 2021/4/17 11:09 下午
 */

// 开发 http://10.10.10.70 http://49.233.163.136:3002 http://10.10.10.70:8080
const DEV_API = 'https://asset.jc-test.cn/customer/api'
// 测试
const TEST_API = 'https://www.fanqy.cn/gym-admin/admin'
// 生产
const PRO_API = 'https://pgymn.cloudsymbol.cn/admin'

const customBaseConfig = {
  development: {
    baseURL: DEV_API
  },
  test: {
    baseURL: TEST_API
  },
  production: {
    baseURL: PRO_API
  }
}

export default customBaseConfig
