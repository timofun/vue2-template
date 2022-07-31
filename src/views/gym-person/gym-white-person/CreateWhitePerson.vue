<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="健身房" prop="gymId">
              <gym-list-dict :value.sync="ruleForm.gymId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" placeholder="请选择" clearable>
                <el-option label="身份证" value="1"/>
                <el-option label="护照" value="2"/>
                <el-option label="其他" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="证件号码"
              prop="certificateNo"
              :rules="{
                validator: checkCertificate, trigger: 'blur'
              }"
            >
              <el-input v-model="ruleForm.certificateNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话"
              prop="mobile"
              :rules="{
                validator: checkPhone, trigger: 'blur'
              }"
            >
              <el-input v-model="ruleForm.mobile" maxLength="11" v-enter-number></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="区域" prop="county">
              <el-select v-model="ruleForm.county" clearable>
                <el-option
                  v-for="item in areaDictData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="remark">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </fn-dialog>
</template>

<script type="text/ecmascript-6">
/**
 * @Description 健身房新增/编辑/详情
 * @Author QINGYU FAN
 * @Version
 * @date 2021/4/24 5:37 下午
 */
import { REQ_OK } from '@/common/js/code'
import { areaDictDataMixin } from '@/common/mixins/dict'
import { dialogMutation } from '@/common/js/observeable'
import GymListDict from 'views/common-components/search-form/gym-list'
import { addGymWhitelistPage, editGymWhitelistPage, gymWhitelistDetail } from '@/api/gym-person'
export default {
  name: 'CreateWhitePerson',
  mixins: [areaDictDataMixin],
  props: {
    gymVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    title: {
      type: String,
      default: '健身房添加'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    const checkCertificate = (rule, value, callback) => {
      if (value && this.ruleForm.certificateType === '1') {
        return this.$Regs.identityReg(rule, value, callback)
      }
      callback()
    }
    const checkPhone = (rule, value, callback) => {
      if (value) {
        return this.$Regs.phoneReg(rule, value, callback)
      }
      callback()
    }
    return {
      checkCertificate: checkCertificate,
      checkPhone: checkPhone,
      visible: false,
      ruleForm: {
        gymId: '',
        name: '',
        certificateType: '',
        certificateNo: '',
        sex: '',
        mobile: '',
        county: '',
        address: ''
      }
    }
  },
  async created () {
    this.visible = this.gymVisible
    if (this.type !== 'add') {
      dialogMutation.changeState(true)
      const { data } = await gymWhitelistDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
      dialogMutation.changeState(false)
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
            addGymWhitelistPage(this.ruleForm).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else {
            editGymWhitelistPage({ id: this.id, ...this.ruleForm }).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          }
        }
      })
    }
  },
  watch: {
    visible: {
      handler () {
        if (!this.visible) {
          this.$emit('update:gymVisible', this.visible)
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
.hours-item-input {
  & + .hours-item-input {
    margin-top 10px
  }
}
</style>
