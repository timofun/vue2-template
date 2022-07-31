<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="运动项名称" prop="sportName">
              <el-input v-model="ruleForm.sportName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="status">
              <el-radio-group v-model="ruleForm.status" style="margin-left: 20px">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
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
 * @Description 运动项新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { addGymSport, editGymSport, getGymSportDetail } from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
export default {
  name: 'CreateGYMSport',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    title: {
      type: String,
      default: '添加运动项目'
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        sportName: '',
        status: '1'
      },
      rules: {
        name: [
          { required: true, message: '请输入运动项', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymSportDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
      this.ruleForm.description = 'hahahahah'
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymSport(this.ruleForm).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymSport({ id: this.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          }
        }
      })
    },
    onEditorChange ({ html }) {
      this.content = html
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
