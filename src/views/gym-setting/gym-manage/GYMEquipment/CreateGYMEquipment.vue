<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="设备名" prop="facilityId">
              <el-select v-model="ruleForm.facilityId" placeholder="请选择设备" clearable>
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
            <el-form-item label="数量" prop="num">
              <el-input-number
                placeholder="请输入数量"
                :controls="false"
                v-model="ruleForm.num" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 设备信息新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { addGymFacility, getGymFacility, editGymFacility, getGymFacilitySettingDict } from '@/api/gym-manage'
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
        facilityId: '',
        num: '',
        remark: ''
      },
      rules: {
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
      deviceTypeDictData: []
    }
  },
  async created () {
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await getGymFacility(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
  },
  mounted () {
    this._getGymFacilitySettingDict()
  },
  computed: {},
  methods: {
    _getGymFacilitySettingDict () {
      getGymFacilitySettingDict().then(({ data }) => {
        if (data.code === REQ_OK) {
          this.deviceTypeDictData = data.data
        }
      })
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addGymFacility({ gymId: this.$route.params.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else if (this.type === 'edit') {
            editGymFacility({ gymId: this.$route.params.id, id: this.id, ...this.ruleForm }).then((res) => {
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
