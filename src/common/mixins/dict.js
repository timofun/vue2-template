// 字典项接口数据
import { areaDict } from '@/api/common'
import { REQ_OK } from '@/common/js/code'

export const areaDictDataMixin = {
  data () {
    return {
      areaDictData: [],
      addressDictData: []
    }
  },
  created () {
    this.getAreaDict()
  },
  methods: {
    // 区域字典项
    getAreaDict () {
      areaDict().then((res) => {
        if (res.data.code === REQ_OK) {
          this.areaDictData = res.data.data
        }
      })
    },
    // 街道字典项
    getAddressDict (pid) {
      areaDict(pid).then((res) => {
        if (res.data.code === REQ_OK) {
          this.addressDictData = res.data.data
        }
      })
    }
  }
}
