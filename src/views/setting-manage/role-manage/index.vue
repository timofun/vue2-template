<template>
  <div class="role-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10" @click="handleClickOperation('add')">新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="roleName" label="角色名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="roleTypeText" label="角色类型" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情" @click="handleClickOperation('detail', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/6.png" alt="编辑" @click="handleClickOperation('edit', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除" @click="handleClickDel(scope.row.id, _delRole)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <setting-role v-if="addVisible" :dialog-visible.sync="addVisible" :title="title" :type="gymType" :id="currId" @success="onSuccess"></setting-role>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Author QINGYU FAN 角色管理
 * @Version
 * @Description
 * @date 2021/3/31 10:39 下午
 */
import { delRole, roleList } from '@/api/role-manage'
import { REQ_OK } from '@/common/js/code'
import { tablePaginationMixin } from '@/common/mixins/table'
import { delFunctionMixin } from '@/common/mixins/common'
import SettingRole from 'views/setting-manage/role-manage/SettingRole'

export default {
  name: 'RoleManage',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      gymType: 'add',
      currId: '',
      title: '角色设置',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'roleName',
            label: '名称',
            type: 'wd',
            value: '',
            placeholder: '请输入名称查询'
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
    // 获取角色列表
    _getTableList (params, done) {
      roleList(this.query, params).then(({ data }) => {
        this.tableData = data.data.list
        this.total = data.data.totalCount
      })['finally'](() => {
        done()
      })
    },
    handleClickOperation (type, item) {
      if (item) {
        this.currId = item.id
      }
      this.title = type === 'detail' ? '角色详情' : '角色设置'
      this.gymType = type
      this.addVisible = true
    },
    _delRole (id) {
      delRole(id).then(({ data }) => {
        if (data.code === REQ_OK) {
          this.$message.success(data.message)
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
    SettingRole
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/css/mixin.styl"
.role-manage-wrapper >>> {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
