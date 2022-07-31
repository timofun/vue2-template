<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="ruleForm.deviceType" placeholder="请选择设备类型" clearable>
                <el-option
                  v-for="item in deviceTypeDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门禁类型" prop="inOut">
              <el-select v-model="ruleForm.inOut" placeholder="请选择门禁类型"
                         clearable :disabled="ruleForm.deviceType !== '1'">
                <el-option
                  v-for="item in inOutData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="设备名" prop="deviceName">
              <el-input v-model="ruleForm.deviceName" placeholder="请输入设备名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编号" prop="deviceNo">
              <el-input v-model="ruleForm.deviceNo" placeholder="请输入设备编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="设备验证码" prop="deviceCaptcha">
              <el-input v-model="ruleForm.deviceCaptcha" placeholder="请输入设备验证码"></el-input>
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
import { addGymPassDevice, getGymPassDeviceDetail, editGymPassDevice } from '@/api/gym-manage'
import { REQ_OK } from 'common/js/code'
import { dictDataType } from '@/api/common'
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
      default: '添加'
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
        deviceName: '',
        deviceNo: '',
        deviceType: '',
        deviceCaptcha: '',
        inOut: ''
      },
      rules: {
        deviceName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      deviceTypeDictData: [],
      inOutData: [{
        label: '进入门禁',
        value: '1'
      },
      {
        label: '出入门禁',
        value: '2'
      }]
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymPassDeviceDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
    this._deviceTypeDictData()
  },
  computed: {},
  methods: {
    _deviceTypeDictData () {
      dictDataType('device_type').then(({ data }) => {
        if (data.code === REQ_OK) {
          this.deviceTypeDictData = data.data
        }
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymPassDevice({ gymId: this.$route.params.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymPassDevice({ gymId: this.$route.params.id, id: this.id, ...this.ruleForm }).then((res) => {
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
    'ruleForm.deviceType': {
      handler (val) {
        if (val !== '1') {
          this.ruleForm.inOut = ''
        }
      }
    },
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
