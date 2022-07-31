<template>
  <el-cascader :props="props" v-model="newValue"></el-cascader>
</template>

<script type="text/ecmascript-6">
import { areaDict } from '@/api/common'
import { REQ_OK } from 'common/js/code'

/**
 * @Description
 * @Author QINGYU FAN
 * @Version
 * @date 2021/5/18 9:57 下午
 */
export default {
  name: 'StreetCascader',
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
    const that = this
    return {
      newValue: '',
      props: {
        emitPath: false,
        lazy: true,
        lazyLoad (node, resolve) {
          that.initData(node, resolve)
        }
      }
    }
  },
  created () {
    console.log(this.value)
    this.newValue = this.value
  },
  mounted () {
  },
  computed: {},
  methods: {
    initData (node, resolve) {
      const { level, value } = node
      if (level === 0) {
        resolve([{
          value: 0,
          label: '杭州市',
          child: []
        }])
      } else if (level === 1) {
        this._getAreaDict({ resolve: resolve, isChild: true })
      } else {
        this._getAreaDict({ resolve, isChild: false, value })
      }
    },
    _getAreaDict ({
      resolve,
      isChild,
      value
    }) {
      areaDict(value).then((res) => {
        if (res.data.code === REQ_OK) {
          const dataSource = res.data.data.map(item => {
            return {
              ...item,
              leaf: !isChild
            }
          })
          resolve(dataSource)
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
  },
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
