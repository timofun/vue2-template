<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="false">
    <div class="person-detail-wrapper">
      <div class="info-container">
        <p>基本信息</p>
        <div class="info-detail">
          <el-avatar :size="60" :src="ruleForm.headImg"></el-avatar>
          <div class="info">
            <div class="item">
              <span class="label">昵称</span>：
              <span class="value">{{ruleForm.nickName}}</span>
            </div>
            <div class="item">
              <span class="label">姓名</span>：
              <span class="value">{{ruleForm.fullName}}</span>
            </div>
            <div class="item">
              <span class="label">性别</span>：
              <span class="value">{{ruleForm.sex}}</span>
            </div>
            <div class="item">
              <span class="label">身份证号</span>：
              <span class="value">{{ruleForm.identityCard}}</span>
            </div>
            <div class="item">
              <span class="label">手机号</span>：
              <span class="value">{{ruleForm.mobile}}</span>
            </div>
            <div class="item">
              <span class="label">健身次数</span>：
              <span class="value">{{ruleForm.fitnessTimes}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table-container">
        <p>订单信息</p>
        <div class="tabs-container">
          <el-radio-group v-model="tabs">
            <el-radio-button :label="1">会员卡详情</el-radio-button>
            <el-radio-button :label="2">预约详情</el-radio-button>
          </el-radio-group>
        </div>
        <div style="display: flex;align-items: center;margin-bottom: 10px" v-if="tabs === 1">
          <el-input v-model="searchKey" :placeholder="placeholder" style="width: 240px" clearable></el-input>
          <el-button type="primary" icon="el-icon-search"
                     style="padding: 11px 20px;margin-left: 5px"
                     @click="onSearch('1')">搜索</el-button>
        </div>
        <div style="display: flex;align-items: center;margin-bottom: 10px" v-else>
          <el-date-picker
            v-model="searchDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" style="padding: 11px 20px;margin-left: 5px"
                     @click="onSearch('2')"
          >搜索</el-button>
        </div>
        <div v-show="tabs === 1">
          <fn-table-base ref="tableRef1" :tableData="gymPersonCardData" :total="gymPersonCardTotal"
                         :showCount="false"
                         row-key="cardNum"
                         @getTableData="_getCardTableList"
                         :watch-resize-id="['search-form-wrapper']"
          >
            <el-table-column :show-overflow-tooltip="true" prop="county" label="区县" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="cardNum" label="卡号" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="cardName" label="会员卡名称" align="center" min-width="120"/>
            <el-table-column :show-overflow-tooltip="true" prop="cardType" label="种类" align="center"/>
<!--            <el-table-column :show-overflow-tooltip="true" prop="mobile" label="类型" align="center"/>-->
            <el-table-column :show-overflow-tooltip="true" prop="price" label="金额" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="payTime" label="购买时间" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="initialTime" label="有效期" align="center">
              <template slot-scope="scope" v-if="scope.row.validityRange.length">
                {{scope.row.validityRange.join('-')}}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="dayRemainder" label="剩余天数" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="useTimesRemainder" label="剩余次数" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="status" label="状态" align="center"/>
          </fn-table-base>
        </div>
        <div v-show="tabs === 2">
          <fn-table-base ref="tableRef2" :tableData="tableData" :total="total"
                         :showCount="false"
                         row-key="tableKey"
                         @getTableData="_getTableList"
                         :watch-resize-id="['search-form-wrapper']"
          >
            <el-table-column :show-overflow-tooltip="true" prop="county" label="区县" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="gymName" label="健身房" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="预约时间" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="timeRange" label="预约时间" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="status" label="核销状态" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="checkTime" label="核销时间" align="center"/>
          </fn-table-base>
        </div>
      </div>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 健身人员详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { editGymComplaintProgress } from '@/api/operate-manage'
import { REQ_OK } from '@/common/js/code'
import { gymPersonAppointment, gymPersonCard, gymPersonDetail } from '@/api/gym-person'
import { tablePaginationMixin } from 'common/mixins/table'
export default {
  name: 'PersonDetail',
  mixins: [tablePaginationMixin],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '详情'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
      },
      rules: {
        status: [
          { required: true, message: '请至少选择一个状态', trigger: 'change' }
        ]
      },
      tabs: 1,
      placeholder: '搜索会员卡名称',
      searchKey: '',
      searchDate: '',
      gymPersonCardData: [],
      gymPersonCardTotal: 0
    }
  },
  async created () {
    this.visible = this.dialogVisible
    this._gymPersonDetail()
  },
  mounted () {
  },
  computed: {},
  methods: {
    _gymPersonDetail () {
      gymPersonDetail(this.id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.ruleForm = res.data.data
        }
      })
    },
    _getCardTableList (params, done) {
      gymPersonCard({ custId: this.id, cardName: this.searchKey }, params).then((res) => {
        if (res.data.code === REQ_OK) {
          this.gymPersonCardData = res.data.data.list
          this.gymPersonCardTotal = res.data.data.totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    _getTableList (params, done) {
      gymPersonAppointment({ custId: this.id, appointmentDate: this.searchDate }, params).then((res) => {
        if (res.data.code === REQ_OK) {
          this.tableData = res.data.data.list
          this.total = res.data.data.totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          editGymComplaintProgress({ id: this.id, ...this.ruleForm }).then((res) => {
            if (res.data.code === REQ_OK) {
              this.$message.success(res.data.message)
              this.$emit('success')
              this.visible = false
            }
          })
        }
      })
    },
    onSearch (type) {
      if (type === '1') {
        this.$refs.tableRef1.refresh()
      } else {
        this.$refs.tableRef2.refresh()
      }
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:dialogVisible', this.visible)
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.person-detail-wrapper {
  .info-container, .table-container {
    padding 20px 23px
    width: 947px;
    border: 1px solid #E5E5E5;
    p {
      margin-bottom 20px
      font-size 14px
      font-weight bold
      color #4d4d4d
    }
  }
  .info-container {
    margin-bottom 20px
    height: 130px;
    border: 1px solid #E5E5E5;
    .info-detail {
      display flex
      padding-left 20px
      .el-avatar {
        flex: 0 0 60px
      }
      .info {
        display flex
        flex-wrap wrap
        align-items center
        justify-content space-between
        margin-left 40px
        .item {
          .label {
            display inline-block
            width 57px
            text-align-last: justify;
            text-align: justify;
            text-justify: distribute-all-lines;
          }
          .value {
            display inline-block
            width 150px
          }
        }
      }
    }
  }
  .table-container {
    position relative
    .tabs-container {
      position absolute
      top 21px
      right 23px
      left 23px
      text-align right
      border-bottom 1px solid #E5E5E5
    }
  }
}
</style>
