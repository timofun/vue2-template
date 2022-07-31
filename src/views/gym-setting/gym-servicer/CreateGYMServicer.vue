<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="健身房名称" prop="gymId">
              <gym-list-dict :value.sync="ruleForm.gymId"></gym-list-dict>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营商" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="微信APPID" prop="appId">
              <el-input v-model="ruleForm.appId" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信商户号" prop="mchId">
              <el-input v-model="ruleForm.mchId" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="微信支付秘钥" prop="securityKey">
              <el-input v-model="ruleForm.securityKey" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" placeholder="请输入"></el-input>
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
import { addGymServicer, editGymServicer, getGymServicerDetail, gymDict } from '@/api/gym-manage'
import { REQ_OK } from '@/common/js/code'
import GymListDict from 'views/common-components/search-form/gym-list'
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
      default: '添加运营商'
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      gymListData: [],
      visible: false,
      ruleForm: {
        name: '',
        gymId: '',
        appId: '',
        mchId: '',
        remark: '',
        securityKey: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        gymId: [
          { required: true, message: '请选择健身房', trigger: 'change' }
        ],
        appId: [
          { required: true, message: '请输入微信APPID', trigger: 'blur' }
        ],
        mchId: [
          { required: true, message: '请输入微信商户号', trigger: 'blur' }
        ],
        securityKey: [
          { required: true, message: '请输入支付秘钥', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this._gymDict()
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymServicerDetail(this.id)
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
            addGymServicer(this.ruleForm).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymServicer({ id: this.id, ...this.ruleForm }).then((res) => {
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
    },
    _gymDict () {
      gymDict().then((res) => {
        if (res.data.code === REQ_OK) {
          this.gymListData = res.data.data
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
    GymListDict
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
