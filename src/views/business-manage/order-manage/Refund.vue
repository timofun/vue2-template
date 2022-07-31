<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" width="800px">
    <div>
      <el-form
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20" justify="space-around">
          <el-col :span="12" :offset="6">
            <el-form-item label="请输入退款金额" prop="refundFee">
              <el-input v-model="ruleForm.refundFee"
                        v-enter-number-range="{ min: 0, max: 99999, precision: 2}"
              >
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" justify="space-around">
          <el-col :span="12" :offset="6">
            <el-form-item label="退款方式" prop="refundType">
              <el-radio-group v-model="ruleForm.refundType">
                <el-radio :label="3">微信退款</el-radio>
                <el-radio :label="4">线下退款</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 处理详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { orderRefund } from '@/api/business-manage'
import { REQ_OK } from '@/common/js/code'
export default {
  name: 'Refund',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '退款'
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
        refundFee: '',
        refundType: 3
      },
      rules: {
        refundFee: [
          { required: true, message: '请输入退款金额', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          orderRefund({ orderCode: this.id, ...this.ruleForm }).then((res) => {
            if (res.data.code === REQ_OK) {
              this.$message.success(res.data.message)
              this.$emit('success')
              this.visible = false
            }
          })
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
