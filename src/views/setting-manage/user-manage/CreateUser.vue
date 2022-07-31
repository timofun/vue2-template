<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div>
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="角色类型" prop="roleType">
              <el-select v-model="ruleForm.roleType" placeholder="请选择"
                         :disabled="!!(!this.id && this.gymId) || userInfo.roleType !== '1'"
                         clearable @change="onChangeRoleType">
                <el-option label="admin" value="1"/>
                <el-option label="区县管理员" value="2"/>
                <el-option label="市级管理员" value="3"/>
                <el-option label="场馆管理" value="4"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="ruleForm.roleId" placeholder="请选择" clearable>
                <el-option
                  v-for="item in roleList"
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
            <el-form-item label="登录账号" prop="account">
              <el-input v-model="ruleForm.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="ruleForm.checkPassword"></el-input>
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
            <el-form-item label="联系号码" prop="mobile">
              <el-input v-model="ruleForm.mobile" maxLength="11" v-enter-number></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="ruleForm.roleType === '2'" :gutter="119" justify="space-around">
          <el-col :span="12">
            <el-form-item label="区县" prop="county">
              <search-county :value.sync="ruleForm.county"></search-county>
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
import { dialogMutation } from '@/common/js/observeable'
import SearchCounty from 'views/common-components/search-form/county'
import { addUser, editUser, roleDict, userDetail } from '@/api/role-manage'
import { mapGetters } from 'vuex'
export default {
  name: 'CreateUser',
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
      default: '健身房添加'
    },
    id: {
      type: String,
      default: ''
    },
    gymId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        gymId: '',
        roleId: '',
        roleType: '',
        account: '',
        checkPassword: '',
        password: '',
        mobile: '',
        county: '',
        sex: '',
        name: ''
      },
      roleList: []
    }
  },
  async created () {
    this.visible = this.dialogVisible
    this.ruleForm.gymId = this.gymId
    if (this.type !== 'add' && this.id) {
      dialogMutation.changeState(true)
      const { data } = await userDetail(this.id)
      this.onChangeRoleType(data.data.roleType)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
      this.ruleForm.county = this.ruleForm.county === 0 ? '' : this.ruleForm.county
      dialogMutation.changeState(false)
    } else if (this.gymId) {
      this.ruleForm.roleType = '4'
      this.onChangeRoleType('4')
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    _roleDict (roleType) {
      roleDict(roleType).then((res) => {
        if (res.data.code === REQ_OK) {
          this.roleList = res.data.data
        }
      })
    },
    onChangeRoleType (value) {
      this._roleDict(value)
    },
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add' || !this.id) {
            addUser({ ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else {
            editUser({ id: this.id, ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
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
          this.$emit('update:dialogVisible', this.visible)
        }
      }
    },
    userInfo: {
      handler (val) {
        this.ruleForm.roleType = this.userInfo.roleType
        this._roleDict(this.userInfo.roleType)
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    SearchCounty
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
