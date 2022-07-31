<template>
  <el-select v-model="newValue" :placeholder="placeholder" clearable :disabled="userInfo.roleType === '4'" filterable>
    <el-option
      v-for="item in dataSource"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script type="text/ecmascript-6">
import { gymDict } from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
import { mapGetters } from 'vuex'

export default {
  name: 'GymListDict',
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
    // this.newValue = this.value
    if (this.userInfo.roleType === '4') {
      this.newValue = this.userInfo.gymId
    }
    this._gymDict()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    _gymDict () {
      gymDict().then((res) => {
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
        this.$emit('on-change-gym', val)
        this.$emit('update:value', val)
      }
    },
    userInfo: {
      handler (val) {
        if (this.userInfo.roleType === '4') {
          this.newValue = this.userInfo.gymId
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
