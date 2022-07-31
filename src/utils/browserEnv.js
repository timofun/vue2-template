/**
 * @Author QINGYU FAN
 * @Version
 * @Description 判断运行环境
 * @date 2020/7/8 10:03
 */
export function isMobile () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isAndroid () {
  return /Android/i.test(navigator.userAgent)
}

export function isWeixin () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

export function isDingtalk () {
  return navigator.userAgent.toLowerCase().indexOf('dingtalk') !== -1
}
