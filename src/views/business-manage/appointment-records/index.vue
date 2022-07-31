<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :init-get-data="false"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="nickName" label="用户昵称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="fullName" label="真实姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sex" label="性别" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="预约时间" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="timeRange" label="预约时段" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="status" label="核销状态" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="checkTime" label="核销时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="80px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="./1.png" alt="取消预约" @click="handleCancel(scope.row)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 预约记录
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { gymAppointmentPage, appointmentCancel } from '@/api/business-manage'
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
            key: 'dateTimeRange',
            label: '预约时间',
            type: 'date-range',
            value: []
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
      gymAppointmentPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    handleCancel (item) {
      this.$confirm('此操作将永久删除该条的预约信息，是否确认操作 ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        appointmentCancel(item.id).then((res) => {
          if (res.data.code === REQ_OK) {
            this.$message.success('取消预约成功')
            this.$refs.tableRef.refresh()
          }
        })
      })['catch'](() => {
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
