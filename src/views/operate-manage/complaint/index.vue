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
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系方式" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="content" label="投诉详情" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="statusText" label="状态" align="center" width="110px"/>
        <el-table-column :show-overflow-tooltip="true" prop="reply" label="进度回复" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img v-if="scope.row.status !== '2'" class="table-btn-img" src="./1.png" alt="进度" @click="handleDetail(scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情"
                   @click="handleClickDetail(scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除"
                   @click="handleClickDel(scope.row.id, _delGymComplaint)">
            </span>
          </template>
        </el-table-column>
        <div slot="statistics" class="statistics-container">
          <span>总投诉：{{statistics.total}}</span>
          <span>待处理：{{statistics.onHand}}</span>
          <span>已解决：{{statistics.handled}}</span>
          <span>处理中：{{statistics.handing}}</span>
          <span>无法处理：{{statistics.cantHandle}}</span>
        </div>
      </fn-table-base>
    </div>
    <handle-detail
      v-if="handleDetailVisible"
      title="进度选择" :id="currId"
      :dialog-visible.sync="handleDetailVisible"
      @success="onSuccess"
    />
    <complaint-detail
      v-if="complaintVisible"
      title="投诉详情" :id="currId"
      :dialog-visible.sync="complaintVisible"
    />
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 投诉记录
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { delFunctionMixin } from '@/common/mixins/common'
import { delGymComplaint, gymComplaintPage, gymComplaintStatistics } from '@/api/operate-manage'
import { REQ_OK } from 'common/js/code'
import HandleDetail from 'views/operate-manage/complaint/HandleDetail'
import ComplaintDetail from 'views/operate-manage/complaint/ComplaintDetail'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      complaintVisible: false,
      handleDetailVisible: false,
      currId: '',
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
            key: 'custName',
            label: '用户姓名',
            type: 'wd',
            value: '',
            placeholder: '请搜索'
          },
          {
            key: 'mobile',
            label: '联系方式',
            type: 'wd',
            value: '',
            placeholder: '请搜索'
          }
        ]
      },
      statistics: {
        cantHandle: 0,
        handing: 0,
        handled: 0,
        onHand: 0,
        total: 0
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
      gymComplaintPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
          gymComplaintStatistics().then((res1) => {
            if (res1.data.code === REQ_OK) {
              this.statistics = {
                ...res1.data.data
              }
            }
          })
        }
      })['finally'](() => {
        done()
      })
    },
    handleDetail (item) {
      this.currId = item.id
      this.handleDetailVisible = true
    },
    handleClickDetail (item) {
      this.currId = item.id
      this.complaintVisible = true
    },
    _delGymComplaint (id) {
      delGymComplaint([id]).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
          this.$refs.tableRef.refresh()
        }
      })
    },
    onSuccess () {
      this.$refs.tableRef.refresh()
    }
  },
  watch: {},
  components: {
    ComplaintDetail,
    HandleDetail
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
