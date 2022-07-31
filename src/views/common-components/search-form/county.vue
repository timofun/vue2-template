<template>
  <el-select v-model="newValue" :placeholder="placeholder" clearable>
    <el-option
      v-for="item in dataSource"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script type="text/ecmascript-6">
import { REQ_OK } from 'common/js/code'
import { areaDict } from '@/api/common'

export default {
  name: 'SearchCounty',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    placeholder: {
      type: [String, Number],
      default: '请选择'
    }
  },
  data () {
    return {
      newValue: '',
      dataSource: []
    }
  },
  created () {
    this.newValue = this.value
    this.getAreaDict()
  },
  methods: {
    getAreaDict () {
      areaDict().then((res) => {
        if (res.data.code === REQ_OK) {
          this.dataSource = res.data.data
        }
      })
    }
  },
  watch: {
    value: {
      handler (val) {
        this.newValue = val
      }
    },
    newValue: {
      handler (val) {
        this.$emit('on-change-county', val)
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
