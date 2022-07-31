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
import { dictDataType } from '@/api/common'
import { REQ_OK } from 'common/js/code'

/**
 * @Description 会员卡类型
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
      newValue: '',
      dataSource: []
    }
  },
  created () {
    this.newValue = this.value
    this._cardTypeDict()
  },
  methods: {
    _cardTypeDict () {
      dictDataType('order_status').then((res) => {
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
