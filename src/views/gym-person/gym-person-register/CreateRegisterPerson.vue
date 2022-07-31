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
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="身份类型" prop="identityType">
              <el-select v-model="ruleForm.identityType" placeholder="请选择" clearable>
                <el-option label="老年人" value="1"/>
                <el-option label="工作人员" value="2"/>
              </el-select>
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
            <el-form-item label="证件号码" prop="certificateNo">
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
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="ruleForm.mobile" maxLength="11"></el-input>
            </el-form-item>
          </el-col>
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传照片" prop="faceUrl">
              <fn-img-upload
                :max-size="200"
                show-tips
                show-camera
                :url.sync="ruleForm.faceUrl"
                :image-max-num="1"
                :multiple="false"
                tips-text="照片"
              >
              </fn-img-upload>
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
import { addGymRegisterPage, editGymRegisterPage, gymRegisterDetail } from '@/api/gym-person'
import GymListDict from 'views/common-components/search-form/gym-list'
export default {
  name: 'CreateRegisterPerson',
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
    return {
      visible: false,
      ruleForm: {
        gymId: '',
        name: '',
        age: '',
        identityType: '',
        certificateType: '',
        certificateNo: '',
        sex: '',
        mobile: '',
        county: '',
        address: '',
        faceUrl: ''
      }
    }
  },
  async created () {
    this.visible = this.gymVisible
    if (this.type !== 'add') {
      dialogMutation.changeState(true)
      const { data } = await gymRegisterDetail(this.id)
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
            addGymRegisterPage(this.ruleForm).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              } else if (data.code === 30001) {
                this.$emit('success')
                this.visible = false
              }
            })
          } else {
            editGymRegisterPage({ id: this.id, ...this.ruleForm }).then(({ data }) => {
              if (data.code === REQ_OK) {
                this.$message.success(data.message)
                this.$emit('success')
                this.visible = false
              } else if (data.code === 30001) {
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
