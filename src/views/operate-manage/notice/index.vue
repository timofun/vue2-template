<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10" @click="handleClickAdd('add')">新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="title" label="公告标题" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="publishTime" label="公告发布时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.publishTime}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="createByText" label="创建人" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="publishStatusText" label="状态" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="120px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情"
                   @click="handleClickAdd('detail', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除"
                   @click="handleClickDel(scope.row)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-g-y-m-notice v-if="addVisible" :dialog-visible.sync="addVisible" :title="title" :type="visibleType" :id="currId" @success="onSuccess"></create-g-y-m-notice>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 公告管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { gymNoticePage, delGymNotice } from '@/api/operate-manage'
import { REQ_OK } from 'common/js/code'
import CreateGYMNotice from './CreateGYMNotice'
export default {
  name: 'GymNotice',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '添加公告',
      visibleType: 'add',
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
            key: 'createByText',
            label: '发起人',
            type: 'wd',
            value: '',
            placeholder: '请搜索发起人'
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
      gymNoticePage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    handleClickAdd (type, item) {
      if (item) {
        this.currId = item.id
        this.title = '详情内容'
      }
      this.visibleType = type
      this.addVisible = true
    },
    handleClickDel (item) {
      delGymNotice([item.id]).then((res) => {
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
    CreateGYMNotice
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
