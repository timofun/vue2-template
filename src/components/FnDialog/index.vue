<template>
  <el-dialog
    ref="dialog"
    append-to-body
    custom-class="fn-container_dialog"
    :title="title"
    :visible="visible"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="showClose"
    @close="handleClose"
    top="0"
  >
    <div slot="title" class="slot-title-wrapper">
      <slot name="title">
        <span class="dialog-title-line"></span>
        <img src="./dialog-title-left.png" alt="">
        <span class="title">{{title}}</span>
        <img src="./dialog-title-right.png" alt="">
        <span class="dialog-title-line"></span>
      </slot>
    </div>
    <div v-loading="loadingState">
      <div class="custom-dialog__body" :style="{height: height, maxHeight: '75vh'}">
        <slot>
        </slot>
      </div>
      <div class="dialog-footer" v-if="showFooter">
        <slot name="custom">
          <el-button :disabled="false"
                     style="background-color: #849AAE;color: #ffffff" @click="handleCancel" class="approval">
            {{showSave ? cancelText : '关闭'}}</el-button>
          <el-button type="primary" :loading="loading" @click="handleSave" :disabled="saveDisabled" v-if="showSave">
            {{saveText}}
          </el-button>
        </slot>
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { dialogLoading } from '@/common/js/observeable'
export default {
  name: 'FnDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '弹窗'
    },
    isTitle: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1160px'
    },
    height: {
      type: String,
      default: 'auto'
    },
    showSave: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    saveText: {
      type: String,
      default: '确定'
    },
    loading: {
      type: Boolean,
      default: false
    },
    saveDisabled: {
      type: Boolean,
      default: false
    },
    showExport: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    loadingState () {
      return dialogLoading.show
    }
  },
  methods: {
    handleSave () {
      this.$emit('save')
    },
    handleCancel () {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    handleClose () {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    handleApproval () {
      this.$emit('orderHandle')
    },
    handleExport () {
      this.$emit('handleExport')
    }
  },
  watch: {},
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-dialog__wrapper >>> {
    display: flex;
    justify-content: center;
    align-items: center;
    .fn-container_dialog {
      position relative
      margin 0
      border-radius 6px
      .slot-title-wrapper {
        display flex
        align-items center
        .title {
          margin 0 17px
        }
        img {
          padding 0 5px
          width 11px
          height 13px
        }
        .dialog-title-line {
          flex 1
          border-bottom: 1px solid #547FFF;
          opacity 0.2
        }
      }
      .el-dialog__header {
        box-sizing: border-box
        height: 46px
        padding: 35px 20px
        text-align center
        .el-dialog__title {
          font-size: 16px
          font-weight 600
          line-height: 1
          color: #1a1a1a
        }
        .el-dialog__headerbtn {
          top 16px
        }
      }
      .el-dialog__body {
        padding 0
      }
      .custom-dialog__body {
        padding 30px 68px
        box-sizing border-box
        overflow-y scroll
        overflow-x: hidden
      }
      .dialog-footer {
        padding: 40px 20px
        background #ffffff
        text-align: center
        border-radius 0 0 6px 6px
      }
    }
  }
</style>
