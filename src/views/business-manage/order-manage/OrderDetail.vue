<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" :show-save="false">
    <div>
      <el-form
        :disabled="true"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="订单号" prop="orderCode">
              <el-input v-model="ruleForm.orderCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健身房名称" prop="gymName">
              <el-input v-model="ruleForm.gymName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="购卡人" prop="fullName">
              <el-input v-model="ruleForm.fullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="身份证号" prop="identityCard">
              <el-input v-model="ruleForm.identityCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="卡号 " prop="cardNum">
              <el-input v-model="ruleForm.cardNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="卡类型" prop="cardTypeText">
              <el-input v-model="ruleForm.cardTypeText"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="购卡时间" prop="orderTime">
              <el-input v-model="ruleForm.orderTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期" prop="remark">
              <el-input :value="`${ruleForm.validityDay}天（${ruleForm.validityStart}至${ruleForm.validityEnd}）`"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="卡名称" prop="cardName">
              <el-input v-model="ruleForm.cardName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余" prop="remark">
              <el-input v-if="ruleForm.cardType === '2'" :value="`${ruleForm.leftTimes}次`"></el-input>
              <el-input v-else :value="`${ruleForm.leftDays}天`"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="状态" prop="orderStatus">
              <el-input v-model="ruleForm.orderStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="出入记录" prop="orderStatus">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <fn-table-base ref="tableRef" :tableData="tableData" :total="total"
                     :showCount="false"
                     @getTableData="_getTableList"
      >
        <el-table-column type="index" width="55" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="inType" label="进出方式" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="inTime" label="时间" align="center" min-width="120px"/>
      </fn-table-base>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 投诉详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { getGymOrderDetail, orderPassLog } from '@/api/business-manage'
import { REQ_OK } from '@/common/js/code'
import { tablePaginationMixin } from 'common/mixins/table'
export default {
  name: 'OrderDetail',
  mixins: [tablePaginationMixin],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '订单详情'
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
        gymName: '',
        custName: '',
        mobile: '',
        content: '',
        images: ''
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    this.getDetail()
  },
  mounted () {
  },
  computed: {},
  methods: {
    _getTableList (params, done) {
      orderPassLog(this.id, params).then(res => {
        if (res.data.code === REQ_OK) {
          const { list, totalCount } = res.data.data
          this.tableData = list
          this.total = totalCount
        }
      })['finally'](() => {
        done()
      })
    },
    getDetail () {
      getGymOrderDetail(this.id).then((res) => {
        if (res.data.code === REQ_OK) {
          this.ruleForm = {
            ...res.data.data
          }
        }
      })
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
</style>
