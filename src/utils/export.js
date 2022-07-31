// a 标签跳转
export const link = (url, open = true) => {
  /**
   * a 标签 open new tab 和 下载
   * url：地址 或 资源
   * open：是否打开新的 tab 页面
   */
  if (!url) return
  const aEle = document.createElement('a')
  aEle.setAttribute('href', url)

  const isIe = isBrowser() === 'IE'
  const isFF = isBrowser() === 'FF'
  const isChrome = isBrowser() === 'Chrome'

  // 火狐打开新 tab
  if (open && isFF) {
    window.open(url)
    return
  }
  //  非火狐打开新tab 和 ie 下载
  if (open || isIe) {
    // aEle.setAttribute('target', '_blank')
    aEle.click()
    aEle.remove()
    return
  }

  if (isChrome) {
    aEle.setAttribute('download', url)
    window.open(url)
    return
  }

  // 其他浏览器的下载
  aEle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
}
/**
 * 检测浏览器是否IE
 */
export const isBrowser = () => {
  // 取得浏览器的userAgent字符串
  let userAgent = navigator.userAgent
  // 判断是否Opera浏览器
  let isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  }

  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }

  // 判断是否Chrome浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }

  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
  // 判断是否IE浏览器
  if ((userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) || userAgent.indexOf('rv:11.0) like Gecko') > -1) {
    return 'IE'
  }
}
