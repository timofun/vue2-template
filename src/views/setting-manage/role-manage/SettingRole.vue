<template>
  <fn-dialog v-if="visible" :visible.sync="visible" :title="title" @save="onSave" :show-save="type !== 'detail'">
    <div class="setting-role-wrapper">
      <el-form
        :disabled="type === 'detail'"
        hide-required-asterisk
        :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色类型" prop="roleType" v-if="userInfo.roleType === '1'">
              <el-select v-model="ruleForm.roleType" placeholder="请选择" clearable>
                <el-option label="admin" value="1"/>
                <el-option label="区县管理员" value="2"/>
                <el-option label="市级管理员" value="3"/>
                <el-option label="场馆管理" value="4"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="right-content" v-if="all_power && all_power.length">
        <el-form class="check-node" style="height: calc(70vh - 100px);overflow-y: scroll">
          <el-tree
            style="max-height: 100%"
            :default-checked-keys="ruleForm.menuIds"
            :data="formatAllPower(all_power)"
            show-checkbox
            :check-strictly="true"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @check-change="onCheckChange"
            @check="onCheck"
            :props="{
              children: 'children',
              label: 'name'
            }">
          </el-tree>
        </el-form>
      </div>
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
import { REQ_OK } from '@/common/js/code'
import { mapGetters } from 'vuex'
import { dialogMutation } from 'common/js/observeable'
import { addRole, editRole, menuTreeAll, roleDetail } from '@/api/role-manage'
export default {
  name: 'SettingRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加运营商'
    },
    type: {
      type: String,
      default: 'add'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      all_power: [], // 所有权限
      ruleForm: {
        roleType: '',
        roleName: '',
        remark: '',
        menuIds: []
      },
      rules: {
        roleType: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    dialogMutation.changeState(true)
    const { data: roleData } = await menuTreeAll()
    this.all_power = roleData.data
    this.visible = this.dialogVisible
    if (this.type !== 'add') {
      const { data } = await roleDetail(this.id)
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = data.data[item]
      })
    }
    dialogMutation.changeState(false)
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    onSave () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            if (this.userInfo.roleType !== '1') {
              this.ruleForm.roleType = this.userInfo.roleType
            }
            addRole({ ...this.ruleForm }).then((res) => {
              if (res.data.code === REQ_OK) {
                this.$message.success(res.data.message)
                this.$emit('success')
                this.visible = false
              }
            })
          } else {
            editRole({ id: this.id, ...this.ruleForm }).then((res) => {
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
    // 选择变动
    onCheckChange (data, checked) {
      // if (data.disabled) return
      // if (checked) {
      //   // 判断是否有子集
      //   if (data.children && data.children.length) {
      //     data.children.forEach(item => {
      //       this.$refs.tree.setChecked(item[this.defaultProps.id], true)
      //     })
      //   }
      // }
      this.ruleForm.menuIds = this.$refs.tree.getCheckedKeys()
    },
    // 选择框被点击回调
    onCheck (data, { checkedKeys }) {
      if (checkedKeys.includes(data.id)) {
        // 判断是否有子集
        if (data.children && data.children.length) {
          data.children.forEach(item => {
            this.$refs.tree.setChecked(item.id, true)
          })
        }
      }
    },
    // 处理是否能选择数据
    formatAllPower (arr) {
      if (this.type !== 'detail') return arr
      return arr.map(item => {
        return {
          ...item,
          disabled: true,
          children: item.children ? this.formatAllPower(item.children) : []
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
.setting-role-wrapper {
  display flex
  .el-form {
    flex 1
  }
  .right-content {
    flex: 1;
    border-left: 1px solid #cccccc;
    padding-left: 20px;
    margin-left: 20px;
  }
}

</style>
