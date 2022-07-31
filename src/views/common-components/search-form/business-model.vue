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
import { dictDataType } from '@/api/common'

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
      newValue: '',
      dataSource: []
    }
  },
  created () {
    this.newValue = this.value
    this._businessDictData()
  },
  methods: {
    _businessDictData () {
      dictDataType('business_model').then(({ data }) => {
        if (data.code === REQ_OK) {
          this.dataSource = data.data
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
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
