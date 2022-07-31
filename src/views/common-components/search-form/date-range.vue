<template>
  <el-date-picker
    v-model="newValue"
    :editable="false"
    value-format="yyyy-MM-dd"
    :default-time="['00:00:00', '23:59:59']"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="年 / 月 / 日 "
    end-placeholder="年 / 月 / 日 "
  >
  </el-date-picker>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
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
