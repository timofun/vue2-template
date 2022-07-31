<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="deviceName" label="设备名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="deviceNo" label="设备编号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="startTime" label="开始时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="endTime" label="结束时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="enterNum" label="进入人数" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="exitNum" label="离开人数" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="passNum" label="通行人数" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间" align="center"/>
      </fn-table-base>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 客流记入
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { gymPassengerFlowPage } from '@/api/business-manage'
import { REQ_OK } from 'common/js/code'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    return {
      searchForm: {
        componentsNodeArray: [
          {
            key: 'gymId',
            label: '健身房名称',
            type: 'gym-list',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'deviceName',
            label: '设备名称',
            type: 'wd',
            value: '',
            placeholder: '请输入设备名称查询'
          },
          {
            key: 'deviceNo',
            label: '设备编号',
            type: 'wd',
            value: '',
            placeholder: '请输入设备编号查询'
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    _getTableList (params, done) {
      gymPassengerFlowPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    }
  },
  watch: {},
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
