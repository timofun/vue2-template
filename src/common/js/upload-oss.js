/**
 * @Description 图片上传oss
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/16 10:20 上午
 */
import { uploadOSSApi } from '@/api/common'
import { REQ_OK } from 'common/js/code'
const uploadOSS = (file) => {
  return new Promise((resolve, reject) => {
    const param = {
      business: 'gym',
      module: 'image',
      file: file // 一定在最后面
    }
    const formData = new FormData() // 以表单的形式传递给oss
    Object.keys(param).forEach((key) => {
      formData.append(key, param[key])
    })
    uploadOSSApi(formData).then((res) => {
      if (res.data.code === REQ_OK) {
        resolve({
          url: res.data.data
        })
      }
    })['catch'](() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        url: ''
      })
    })
  })
}

export default uploadOSS
