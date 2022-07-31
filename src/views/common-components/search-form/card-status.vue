<template>
  <el-select v-model="newValue" :placeholder="placeholder" clearable>
    <el-option label="上架" :value="true"></el-option>
    <el-option label="下架" :value="false"></el-option>
  </el-select>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 会员卡状态
 * @Author QINGYU FAN
 * @Version
 * @date 2021/5/3 9:24 下午
 */
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    placeholder: {
      type: [String, Number],
      default: '请输入'
    }
  },
  data () {
    return {
      newValue: ''
    }
  },
  created () {
    this.newValue = this.value
  },
  methods: {
  },
  watch: {
    value: {
      handler (val) {
        this.newValue = val
      }
    },
    newValue: {
      handler (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
