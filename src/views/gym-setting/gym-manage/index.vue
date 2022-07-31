<template>
  <div class="gym-manage-wrapper pd-30">
    <fn-bread-crumb/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-search-form label-width="85px" :search-form="searchForm" @search="handleSearch" @reset="handleReset"/>
    <fn-button-header>
      <div slot="left">
        <el-button
          type="primary" class="mg-r-10"
          v-btn-auth:handleClickAdd="{handleType: ['add'], auth: 'gym_add'}">
          新增
        </el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="county" label="区县" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="street" label="街道" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="健身房名称" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="address" label="地址" align="center" min-width="120px"/>
        <el-table-column :show-overflow-tooltip="true" prop="businessModelText" label="收费状态" align="center" width="110px"/>
        <el-table-column prop="sell" label="是否上架" align="center" width="110px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.sell"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="true"
              :inactive-value="false"
              @change="handleChangeStatus(scope.row, 'sell')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="appointment" label="是否开启营业" align="center" width="110px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.appointment"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="true"
              :inactive-value="false"
              @change="handleChangeStatus(scope.row, 'appointment')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新日期" align="center" width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="530px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img
                class="table-btn-img" src="./4.png" alt="硬件设施"
                v-btn-auth:handleClickRouter="{handleType: ['gym-hardware', scope.row], auth: 'gym_hardware'}"
              >
              <img
                class="table-btn-img" src="./3.png" alt="门禁设施"
                v-btn-auth:handleClickRouter="{handleType: ['gym-access-control', scope.row], auth: 'gym_access_control'}"
              >
              <img
                class="table-btn-img" src="./2.png" alt="设施设备"
                v-btn-auth:handleClickRouter="{handleType: ['gym-equipment', scope.row], auth: 'gym_equipment'}"
              >
              <img v-if="scope.row.businessModel === '1'"
                   class="table-btn-img" src="./1.png" alt="预约时段"
                   v-btn-auth:handleClickRouter="{handleType: ['gym-appointments', scope.row], auth: 'gym_appointments'}"
              >
              <img class="table-btn-img" src="./5.png" alt="课程活动"
                   v-btn-auth:handleClickRouter="{handleType: ['gym-course', scope.row], auth: 'gym_course'}"
              >
              <img class="table-btn-img" src="./7.png" alt="详情"
                   @click="handleClickAdd('detail', scope.row)"
              >
              <img class="table-btn-img" src="./6.png" alt="编辑"
                   v-btn-auth:handleClickAdd="{handleType: ['edit', scope.row], auth: 'gym_edit'}"
              >
              <img class="table-btn-img" src="./8.png" alt="删除"
                   v-btn-auth:handleClickDel="{handleType: [scope.row.id, _delGym], auth: 'gym_delete'}"
              >
            </span>
          </template>
        </el-table-column>
        <div slot="statistics" class="statistics-container">
          <span>健身房：{{statistics.total}}</span>
          <span>免费：{{statistics.free}}</span>
          <span>付费：{{statistics.pay}}</span>
        </div>
      </fn-table-base>
    </div>
    <create-g-y-m v-if="addVisible" :gym-visible.sync="addVisible" :title="title" :type="gymType" :gym-id="gymCurrId" @success="onSuccess"></create-g-y-m>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 健身房管理主页
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import { delGym, getGymStatistics, gymAppointment, gymPage, gymSell } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import CreateGYM from '@/views/gym-setting/gym-manage/CreateGYM'
import { areaDictDataMixin } from '@/common/mixins/dict'
import { delFunctionMixin } from '@/common/mixins/common'
export default {
  name: 'GymManage',
  mixins: [tablePaginationMixin, areaDictDataMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '健身房添加',
      gymType: 'add',
      gymCurrId: '',
      statistics: {
        free: 0,
        pay: 0,
        total: 0
      },
      searchForm: {
        componentsNodeArray: [
          {
            key: 'county',
            label: '区县',
            type: 'county',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'street',
            label: '街道',
            type: 'street',
            value: '',
            placeholder: '请先选择区县'
          },
          {
            key: 'gymId',
            label: '健身房名称',
            type: 'gym-list',
            value: '',
            placeholder: '全部'
          },
          {
            key: 'businessModel',
            label: '收费状态',
            type: 'business-model',
            value: '',
            placeholder: '全部'
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
      gymPage(this.query, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
          getGymStatistics().then((res1) => {
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
    handleClickAdd (type, item) {
      if (item) {
        this.gymCurrId = item.id
        this.title = type === 'edit' ? '编辑健身房' : '健身房详情'
      } else {
        this.title = '添加健身房'
      }
      this.gymType = type
      this.addVisible = true
    },
    handleClickRouter (path, item) {
      this.$router.push(`/gym/gym-setting/${path}/${item.id}`)
    },
    handleChangeStatus (row, type) {
      if (type === 'sell') {
        gymSell({ ...row }).then((res) => {
          if (res.data.code === REQ_OK) {
            this.$message.success(res.data.message)
          } else {
            row.status = !row.status
          }
        })
      } else {
        gymAppointment({ ...row }).then((res) => {
          if (res.data.code === REQ_OK) {
            this.$message.success(res.data.message)
          } else {
            row.status = !row.status
          }
        })
      }
    },
    _delGym (id) {
      delGym(id).then((res) => {
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
    CreateGYM
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.gym-manage-wrapper {
  position relative
}
</style>
