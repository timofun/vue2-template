<template>
  <el-input v-model="newValue" :placeholder="placeholder" clearable></el-input>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    value: {
      type: [String, Number],
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
