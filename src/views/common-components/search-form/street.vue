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
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    placeholder: {
      type: [String, Number],
      default: '请输入'
    },
    countyId: {
      type: [String, Number],
      default: ''
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
  },
  methods: {
    // 街道字典项
    getAddressDict (pid) {
      areaDict(pid).then((res) => {
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
        this.$emit('update:value', val)
      }
    },
    countyId: {
      handler (val) {
        this.newValue = ''
        if (val) {
          this.getAddressDict(val)
        } else {
          this.dataSource = []
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
