<template>
  <div class="gym-appointment-wrapper pd-30">
    <fn-bread-crumb is-button @save="onSave"/>
    <fn-page-title :title="$route.meta.title"/>
    <fn-button-header>
      <div slot="left">
        <el-button type="primary" class="mg-r-10" @click="handleClickAdd('add')">新增</el-button>
      </div>
    </fn-button-header>
    <div>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     :bottomOffset="200"
                     @getTableData="_getTableList"
                     :watch-resize-id="['search-form-wrapper']"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sportName" label="月份" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.dateRange && scope.row.dateRange.length">
              {{scope.row.dateRange[0]}}至{{scope.row.dateRange[1]}}
            </span>
            <span v-else>- -</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="sportName" label="可预约时段" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间" align="center"/>
        <el-table-column class-name="action-bar" label="操作" align="center" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="table-btn-img-wrapper">
              <img class="table-btn-img" src="../7.png" alt="详情" @click="handleClickAdd('detail', scope.row)">
              <img class="table-btn-img" src="../6.png" alt="编辑" @click="handleClickAdd('edit', scope.row)">
              <img class="table-btn-img" src="../8.png" alt="删除"
                   @click="handleClickDel(scope.row.id, _del)">
            </span>
          </template>
        </el-table-column>
      </fn-table-base>
      <el-form
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="155px">
        <el-row justify="space-around">
          <el-col :span="8">
            <el-form-item label="仅允许白名单用户预约" prop="whiteList">
              <el-radio-group v-model="ruleForm.whiteList">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否严进严出" prop="strictInOut">
              <el-radio-group v-model="ruleForm.strictInOut">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-around">
          <el-col :span="8">
            <el-form-item label="是否开启预约过期" prop="expire">
              <el-radio-group v-model="ruleForm.expire">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间" prop="expireTime">
              <el-date-picker
                style="width: 250px"
                :disabled="!ruleForm.expire"
                v-model="ruleForm.expireTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择过期时间"/>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="font-size: 12px;color: #547FFF;">
          * 如果选择开启约过期限制会根据填写的时间进行预约过期处理，如果为选着开启预约过期限制则会在每天晚上24点自动预约过期处理
        </div>
      </el-form>
    </div>
    <appointment-select-dialog
      v-if="selectVisible" :dialog-visible.sync="selectVisible" @onSelect="onSelect"></appointment-select-dialog>
    <create-g-y-m-appointment v-if="addVisible" :dialog-visible.sync="addVisible" :title="title" :type="type" :id="currId" @success="onSuccess" :holiday-type="holidayType"></create-g-y-m-appointment>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 预约时段
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/18 11:46 下午
 */
import { tablePaginationMixin } from '@/common/mixins/table'
import {
  gymAppointmentPage,
  getAppointmentSettingGym,
  gymAppointmentSettingGym,
  delAppointmentSettingGym
} from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import CreateGYMAppointment from './CreateGYMAppointment'
import AppointmentSelectDialog from 'views/gym-setting/gym-manage/GYMAppointment/SelectAppointmentType'
import { delFunctionMixin } from 'common/mixins/common'
export default {
  name: 'GymSport',
  mixins: [tablePaginationMixin, delFunctionMixin],
  props: {},
  data () {
    return {
      addVisible: false,
      title: '添加预约时段',
      type: 'add',
      holidayType: '1',
      currId: '',
      selectVisible: false,
      ruleForm: {
        strictInOut: false,
        whiteList: false,
        expireTime: '',
        expire: false
      }
    }
  },
  created () {
    this._getAppointmentSettingGym()
  },
  mounted () {
  },
  computed: {},
  methods: {
    _getAppointmentSettingGym () {
      getAppointmentSettingGym(this.$route.params.id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.ruleForm = res.data.data
        }
      })
    },
    _getTableList (params, done) {
      gymAppointmentPage(this.$route.params.id, params).then(res => {
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
      this.type = type
      if (type !== 'add') {
        this.holidayType = item.type
        this.currId = item.id
        this.addVisible = true
        this.title = type === 'edit' ? '编辑预约时段' : '预约时段详情'
      } else {
        this.selectVisible = true
      }
    },
    onSelect (type) {
      this.holidayType = type
      this.addVisible = true
      this.$nextTick(() => {
        this.selectVisible = false
      })
    },
    onSave () {
      gymAppointmentSettingGym({ gymId: this.$route.params.id, ...this.ruleForm }).then((res) => {
        if (res.data.code === REQ_OK) {
          this.$message.success('保存成功')
        }
      })
    },
    _del (id) {
      delAppointmentSettingGym(id).then((res) => {
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
  watch: {
    'ruleForm.expire': {
      handler (val) {
        if (!val) {
          this.ruleForm.expireTime = ''
        }
      }
    }
  },
  components: {
    AppointmentSelectDialog,
    CreateGYMAppointment
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.gym-appointment-wrapper {
  position absolute;
  top: 0;
  left 0;
  right 0;
  bottom 0;
  background-color $color-w;
  z-index 10;
  .el-form-item{
    margin-bottom 5px
  }
}
</style>
