<template>
  <div class="fn-image-upload" :style="{width: width}">
    <el-upload
      accept="image/*"
      capture="camera"
      :limit="imageMaxNum"
      :multiple="multiple"
      :data="upData"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :file-list="urlList"
      action=""
      :http-request="httpRequest"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <fn-dialog title="图片预览" :visible.sync="dialogVisible" :show-footer="false"
               v-if="dialogVisible" :show-save="false" :show-close="true">
      <el-carousel arrow="always" :autoplay="false" :initial-index="currentImgIndex" v-if="multiple" class="img-swiper-cmp">
        <el-carousel-item v-for="(item, index) in preImgList" :key="index">
          <div style="display: flex;align-items: center;justify-content: center;height: 100%">
            <img style="max-width: 100%;max-height: 100%;" :src="item.url" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="box-card" style="display: flex;align-items: center;justify-content: center;min-height: 50vh;" v-else>
        <img style="max-width: 100%" :src="dialogImageUrl" alt="">
      </div>
    </fn-dialog>
    <div style="font-size: 12px;color: #999999" v-if="showTips">
      点击"+"可上传本地照片，照片大小200KB
    </div>
    <take-photos @on-update-url="onUpdateUrl" v-if="showCamera && !multiple"/>
  </div>
</template>
<script>
import noPhoto from './no_photo.png'
import { getToken } from '@/utils/auth'
import { REQ_OK } from '@/common/js/code'
import customBaseConfig from '@/utils/config'
import uploadOSS from 'common/js/upload-oss'
import TakePhotos from 'views/gym-person/gym-person-register/Camera'
export default {
  components: { TakePhotos },
  props: {
    width: {
      type: String,
      default: '800px'
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    url: {
      type: [Array, String],
      default () {
        return []
      }
    },
    action: {
      type: String,
      default: ''
    },
    imageMaxNum: {
      type: Number,
      default: 1
    },
    multiple: Boolean,
    tipsText: {
      type: String,
      default: '单次'
    },
    showCamera: Boolean,
    showTips: Boolean,
    maxSize: Number
  },
  data () {
    return {
      dialogImageUrl: noPhoto,
      noPhotoSrc: noPhoto,
      dialogVisible: false,
      upData: {
        type: 'image'
      },
      src: '',
      urlList: [],
      preImgList: [],
      cacheUrlList: [],
      currentImgIndex: 0,
      isInit: true
    }
  },
  computed: {
    defaultAction () {
      return customBaseConfig[process.env.NODE_ENV].baseURL + '/file/upload'
    },
    headers () {
      return {
        Authorization: getToken()
      }
    }
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this._imageInit()
    }, 1000)
  },
  methods: {
    // 拍照上传成功
    onUpdateUrl (url) {
      this.urlList = [{
        url
      }]
      this.dialogImageUrl = url
      this.$emit('update:url', url)
    },
    // 最大上传张数
    onExceed (file, fileList) {
      this.$message.warning(`${this.tipsText}上传不超过${this.imageMaxNum}张`)
    },
    // 删除
    handleRemove (file, fileList) {
      this.preImgList = fileList
      if (this.multiple) {
        this.cacheUrlList = fileList.map(item => {
          return item.url
        })
        this.$emit('update:url', this.cacheUrlList)
      } else {
        this.$emit('update:url', '')
      }
      this.$emit('delUrl', file, fileList)
    },
    // 预览
    handlePictureCardPreview (file) {
      this.preImgList.forEach((item, index) => {
        if (item.url === file.url) {
          this.currentImgIndex = index
        }
      })
      this.dialogVisible = true
    },
    // 阻止upload的自己上传，进行再操作
    beforeUpload (file) {
      if (this.maxSize) {
        const isLt2M = file.size / 1024 < this.maxSize
        if (!isLt2M) {
          this.$message.error('上传图片超过限制')
        }
        return isLt2M
      } else {
        return true
      }
    },
    httpRequest (params) {
      uploadOSS(params.file).then((res) => {
        if (res.url) {
          if (this.multiple) {
            this.cacheUrlList.push(res.url)
            this.$emit('update:url', this.cacheUrlList)
          } else {
            this.dialogImageUrl = res.url
            this.$emit('update:url', res.url)
          }
        }
      })
    },
    handleSuccess (res, file, fileList) {
      this.preImgList = fileList
      if (this.multiple) {
        if (res.code === REQ_OK) {
          const list = fileList.map(item => {
            if (item.status === 'success') {
              return item.response.data.url
            }
          })
          this.$emit('update:url', list)
        } else {
          this.urlList = fileList.filter(item => {
            return item.uid !== file.uid
          })
          this.$message.error(res.msg)
        }
      } else {
        if (res.code === REQ_OK) {
          this.dialogImageUrl = file.url
          this.$emit('update:url', res.data.url)
        } else {
          this.dialogImageUrl = noPhoto
          this.$message.error(res.msg)
        }
      }
    },
    _imageInit () {
      if (this.multiple) {
        this.urlList = this.url.map(item => {
          return {
            name: 'file',
            url: item
          }
        })
        this.cacheUrlList = this.url
        this.preImgList = this.urlList
      } else if (this.url) {
        this.urlList = [{
          url: this.url
        }]
        this.dialogImageUrl = this.url
      }
    }
  },
  watch: {
    // 如果传进来的url为空，那么清空已经存在的图片
    url (val) {
      if (val && !val.length) {
        this.urlList = []
      }
    }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  .fn-image-upload::after{
    content: '';
    position: absolute;
    font-size: 10px;
    color: #909399;
  }
  .el-upload {
    position: relative;
  }
.fn-image-upload >>>
  .el-upload-list--picture-card
    .el-upload-list__item
      width 122px
      height 122px
      margin 0 13.5px 8px 0
      &:nth-child(6n)
        margin-right 0
  .single-img-upload
    .el-upload--picture-card
      margin-bottom 8px
      width 300px
      height: 122px;
      line-height 122px
      border: 1px dashed #d6d9e2;
      box-sizing: border-box;
  .el-upload--picture-card
    margin-bottom 8px
    width 122px
    height: 122px;
    line-height 122px
    border: 1px dashed #d6d9e2;
    box-sizing: border-box;
  .upload_status {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #e0e0e0;
    text-align: center;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2);
    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2);

    .el-icon-upload-success {
      position: absolute;
      font-size: 12px;
      margin-top: 11px;
      left: 15px;
      color: #000;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }

  .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-transition: opacity .3s;
    transition: opacity .3s;

    &:hover {
      opacity: 1;
    }
    .icon-box {
      display: block;

      .preview {
        padding 15px
        cursor: pointer;
        i {
          color: #fff;
          font-size: 22px;
        }
      }
    }
  }
</style>
