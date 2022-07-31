<template>
  <el-date-picker
    v-model="newValue"
    type="month"
    format="yyyy-MM"
    value-format="M"
    placeholder="年 / 月">
  </el-date-picker>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DateMonth',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newValue: []
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
