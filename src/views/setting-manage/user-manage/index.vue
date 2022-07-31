<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" @click="handleClickOperation('add')">新增</el-button>
<!--        <el-button type="primary" @click="handleExport()" disabled>导出</el-button>-->
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     row-key="tableKey"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="场馆名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="account" label="登录账号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="用户姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sex" label="性别" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系号码" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="roleName" label="角色" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="businessModelText" label="备注" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              active-value="1"
              inactive-value="2"
              @change="handleChangeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img v-if="scope.row.id" class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情" @click="handleClickOperation('detail', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/6.png" alt="编辑" @click="handleClickOperation('edit', scope.row)">
              <img v-if="scope.row.id" class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除" @click="handleClickDel(scope.row.id, _delUser)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-user v-if="addVisible" :dialog-visible.sync="addVisible"
                 :title="title" :type="gymType" :id="currId" :gym-id="gymId"
                 @success="onSuccess"/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 用户管理
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { REQ_OK } from '@/common/js/code'
import { delFunctionMixin } from '@/common/mixins/common'
import { delUser, userList, userStatus } from '@/api/role-manage'
import CreateUser from 'views/setting-manage/user-manage/CreateUser'
export default {
  name: 'UserManage',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      gymType: 'add',
      gymId: '',
      currId: '',
      title: '用户设置',
      searchForm: {
        componentsNodeArray: [
          {
            key: 'gymId',
            label: '健身房名称',
            type: 'gym-list',
            value: ''
          },
          {
            key: 'account',
            label: '登录账号',
            type: 'wd',
            value: ''
          },
          {
            key: 'name',
            label: '用户姓名',
            type: 'wd',
            value: ''
          },
          {
            key: 'roleName',
            label: '角色',
            type: 'wd',
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
      userList(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })
      done()
    },
    handleExport () {
    },
    handleChangeStatus (item) {
      userStatus({ ...item }).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
        } else {
          item.status = !item.status
        }
      })
    },
    handleClickOperation (type, item) {
      if (item) {
        if (item.id) {
          this.currId = item.id
        } else {
          this.currId = ''
          this.gymId = item.gymId
        }
      } else {
        this.currId = ''
        this.gymId = ''
      }
      this.title = type === 'detail' ? '用户详情' : '用户设置'
      this.gymType = type
      this.addVisible = true
    },
    _delUser (id) {
      delUser(id).then(({ data }) => {
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
    CreateUser
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
