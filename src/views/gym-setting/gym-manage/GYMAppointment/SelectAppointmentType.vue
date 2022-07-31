<template>
  <fn-dialog v-if="visible" :visible.sync="visible" title="预约时段详情-新建" @save="onSave">
    <div class="appointment-select-wrapper">
      <span :class="[currType === '1' ? 'active': '']" @click="currType = '1'">预约时段配置</span>
      <span :class="[currType === '2' ? 'active': '']" @click="currType = '2'">法定预约时段配置</span>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 预约时段类型选择
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
export default {
  name: 'AppointmentSelectDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      currType: '1'
    }
  },
  async created () {
    this.visible = this.dialogVisible
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSave () {
      this.$emit('onSelect', this.currType)
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:dialogVisible', this.visible)
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.appointment-select-wrapper {
  display flex
  justify-content space-between
  width 734px
  margin auto
  span {
    display inline-block
    width 321px
    height 105px
    line-height 105px
    text-align center
    border-radius 2px
    background-color #f3f3f3
    &:hover {
      cursor pointer
    }
    &.active {
      background-color $color-button
      color $color-w
    }
  }
}
</style>
