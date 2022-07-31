<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave">
    <div>
      <el-form
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">处理中</el-radio>
                <el-radio :label="2">已完成</el-radio>
                <el-radio :label="3">无法处理</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="24">
            <el-form-item label="进度回复" prop="reply">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入进度回复"
                v-model="ruleForm.reply">
              </el-input>
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
import { editGymComplaintProgress } from '@/api/operate-manage'
import { REQ_OK } from '@/common/js/code'
export default {
  name: 'HandleDetail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加运营商'
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
        status: '',
        reply: ''
      },
      rules: {
        status: [
          { required: true, message: '请至少选择一个状态', trigger: 'change' }
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
          editGymComplaintProgress({ id: this.id, ...this.ruleForm }).then((res) => {
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
