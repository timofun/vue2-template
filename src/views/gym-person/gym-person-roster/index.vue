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
        <el-table-column :show-overflow-tooltip="true" prop="county" label="头像" align="center">
          <template slot-scope="scope">
            <el-avatar shape="square" size="large" :src="scope.row.headImg"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sex" label="性别" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="identityCard" label="身份证号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="手机号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="initialTime" label="首次时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="70px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情"
                   @click="handleClickDetail(scope.row)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <person-detail v-if="visible" :dialog-visible.sync="visible" :id="currId"/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 健身名单
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { REQ_OK } from 'common/js/code'
import { gymPersonPage } from '@/api/gym-person'
import PersonDetail from 'views/gym-person/gym-person-roster/PersonDetail'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin],
  props: {},
  data () {
    return {
      visible: false,
      currId: '',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'nickName',
            label: '昵称',
            type: 'wd',
            value: '',
            placeholder: '请输入'
          },
          {
            key: 'fullName',
            label: '姓名',
            type: 'wd',
            value: '',
            placeholder: '请输入'
          },
          {
            key: 'mobile',
            label: '手机号',
            type: 'wd',
            value: '',
            placeholder: '请输入'
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
      gymPersonPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    handleClickDetail (item) {
      this.currId = item.id
      this.visible = true
    }
  },
  watch: {},
  components: {
    PersonDetail
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
