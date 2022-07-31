<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb>
      <el-radio-group v-model="hasComplete" @change="onChange">
        <el-radio-button :label="false">未完善</el-radio-button>
        <el-radio-button :label="true">已完善</el-radio-button>
      </el-radio-group>
    </fn-bread-crumb>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header v-if="hasComplete">
      <div slot="left">
        <el-button type="primary" class="mg-r-8" @click="handleClickAdd('add')">新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="faceUrl" label="照片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 30px; height: 30px;vertical-align: middle"
              :src="scope.row.faceUrl"
              fit="cover">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 30px"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房名称" align="center" min-width="200"/>
        <el-table-column :show-overflow-tooltip="true" prop="identityTypeText" label="身份类型" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sex" label="性别" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="age" label="年龄" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="mobile" label="联系电话" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="countyText" label="区域" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="address" label="住址" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="address" label="人脸上传是否通过" align="center" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.facePass ? '通过' : '未通过'}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img v-if="!hasComplete" class="table-btn-img" src="./complete.png" alt="完善" @click="handleClickAdd('complete', scope.row)">
              <img v-else class="table-btn-img" src="../../gym-setting/gym-manage/6.png" alt="编辑" @click="handleClickAdd('complete', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/7.png" alt="详情" @click="handleClickAdd('detail', scope.row)">
              <img class="table-btn-img" src="../../gym-setting/gym-manage/8.png" alt="删除" @click="handleClickDel(scope.row.id, _delGymWhite)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
    </div>
    <create-register-person v-if="addVisible" :gym-visible.sync="addVisible" :title="title" :type="gymType" :id="currId" @success="onSuccess"/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 现场登记
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { REQ_OK } from 'common/js/code'
import { delGymRegister, gymPersonRegisterPage } from '@/api/gym-person'
import { delFunctionMixin } from 'common/mixins/common'
import CreateRegisterPerson from 'views/gym-person/gym-person-register/CreateRegisterPerson'
export default {
  name: 'GymRegister',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
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
            placeholder: '请选择'
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
      gymPersonRegisterPage({ hasComplete: this.hasComplete, ...this.query }, params).then(res => {
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
      this.title = type === 'add' ? '现场登记' : '现场登记详情'
      this.gymType = type
      this.addVisible = true
    },
    _delGymWhite (id) {
      delGymRegister(id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success(res.data.message)
          this.$refs.tableRef.refresh()
        }
      })
    },
    onChange (value) {
      this.$refs.tableRef.refresh()
    },
    onSuccess () {
      this.$refs.tableRef.refresh()
    }
  },
  watch: {},
  components: {
    CreateRegisterPerson
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
