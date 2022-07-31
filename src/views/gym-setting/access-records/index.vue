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
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="场馆名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="custName" label="用户姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="identityCard" label="身份证号" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系电话" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="inTime" label="进入时间" align="center" width="160px"/>
        <el-table-column :show-overflow-tooltip="true" prop="inType" label="进入方式" align="center" width="110px"/>
        <el-table-column :show-overflow-tooltip="true" prop="outTime" label="离开时间" align="center" width="160px"/>
        <el-table-column :show-overflow-tooltip="true" prop="outType" label="离开方式" align="center" width="110px">
          <template slot-scope="scope">
            {{ scope.row.outType === 0 ? '' : scope.row.outType}}
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 出入记录
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { gymPassLogPage } from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
export default {
  name: 'GymAccess',
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
            key: 'passTimeRange',
            label: '进入时间',
            type: 'date-range',
            value: []
          },
          {
            key: 'month',
            label: '月份',
            type: 'date-month',
            value: ''
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
      gymPassLogPage(this.query, params).then(res => {
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
