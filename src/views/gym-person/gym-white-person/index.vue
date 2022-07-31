<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-8" @click="handleClickAdd('add')">新增</el-button>
        <el-upload
          style="display: inline-block"
          class="mg-r-8"
          accept=".xls,.xlsx"
          action=""
          :limit="1"
          :http-request="httpRequest"
          :show-file-list="false"
          :file-list="fileList"
        >
          <el-button type="primary" :loading="importLoading">导入</el-button>
        </el-upload>
        <el-button @click="handleDownExcel()">下载导入模板</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房名称" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="countyText" label="区域" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="certificateTypeText" label="证件类型" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="certificateNo" label="证件号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sex" label="性别" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系电话" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="address" label="住址" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情" @click="handleClickAdd('detail', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/6.png" alt="编辑" @click="handleClickAdd('edit', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除" @click="handleClickDel(scope.row.id, _delGymWhite)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-white-person v-if="addVisible" :gym-visible.sync="addVisible" :title="title" :type="gymType" :id="currId" @success="onSuccess"></create-white-person>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 白名单登记
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { REQ_OK } from '@/common/js/code'
import { delGymWhitelistPage, gymWhitelistPage } from '@/api/gym-person'
import { delFunctionMixin } from '@/common/mixins/common'
import CreateWhitePerson from '@/views/gym-person/gym-white-person/CreateWhitePerson'
import fileStreamDownLoad from '@/utils/fileStreamDownLoad'
import { whiteExportTemplate, whiteImport } from '@/api/common'
export default {
  name: 'GymWhitePerson',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      importLoading: false,
      fileList: [],
      hasComplete: false,
      addVisible: false,
      gymType: 'add',
      currId: '',
      title: '白名单登记',
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
            key: 'county',
            label: '区域',
            type: 'county',
            value: '',
            placeholder: '请选择'
          },
          {
            key: 'name',
            label: '姓名',
            type: 'wd',
            value: '',
            placeholder: '请输入'
          },
          {
            key: 'mobile',
            label: '联系电话',
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
      gymWhitelistPage(this.query, params).then(res => {
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
      }
      this.title = type === 'add' ? '白名单登记' : type === 'edit' ? '白名单编辑' : '白名单详情'
      this.gymType = type
      this.addVisible = true
    },
    // 下载excel模版
    handleDownExcel () {
      whiteExportTemplate().then((res) => {
        if (res.data) {
          fileStreamDownLoad(res)
        }
      })
    },
    httpRequest (params) {
      this.importLoading = true
      whiteImport(params.file).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
          this.$refs.tableRef.refresh()
        }
      })['finally'](() => {
        this.fileList = []
        this.importLoading = false
      })
    },
    _delGymWhite (id) {
      delGymWhitelistPage(id).then((res) => {
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
    CreateWhitePerson
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
