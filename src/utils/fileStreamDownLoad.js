/**
 * @Author QINGYU FAN
 * @Version
 * @Description 文件流下载
 * @date 2020/8/11 15:24
 */

export default function fileStreamDownLoad (res) {
  // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
  const blob = new Blob([res.data], { type: 'application/octet-stream;charset=utf-8' })
  // 设置文件名称,decodeURI：可以对后端使用encodeURI() 函数编码过的 URI 进行解码。encodeURI() 是后端为了解决中文乱码问题
  let fileName = decodeURI(res.headers['content-type'])
  fileName = decodeURI(fileName)
  if (fileName) { // 根据后端返回的数据处理文件名称
    fileName = fileName.substring(fileName.indexOf('=') + 1)
    fileName = fileName.substring(0, fileName.indexOf(';'))
  }
  const elink = document.createElement('a')// 创建一个a标签
  elink.download = fileName// 设置a标签的下载属性
  elink.style.display = 'none'// 将a标签设置为隐藏
  elink.href = URL.createObjectURL(blob)// 把之前处理好的地址赋给a标签的href
  document.body.appendChild(elink)// 将a标签添加到body中
  elink.click()// 执行a标签的点击方法
  URL.revokeObjectURL(elink.href) // 下载完成释放URL 对象
  document.body.removeChild(elink)// 移除a标签
}
