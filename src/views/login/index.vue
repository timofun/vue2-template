<template>
  <div class="login_container">
    <div class="bg-wrapper"/>
    <h2 class="title">百姓健身房后台管理系统</h2>
    <div class="login-form-wrapper">
      <div class="out-content">
        <div class="in-content">
          <span class="in-title">用户登录</span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="form-content">
            <el-form-item prop="account">
              <el-input
                style="margin-bottom:12px"
                prefix-icon="el-icon-user"
                placeholder="请输入账号"
                v-model="ruleForm.account"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"></el-input>
            </el-form-item>
            <div class="submit-content">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @Author QINGYU FAN
 * @Version
 * @Description
 * @date 2021/2/18 2:03 下午
 */
import { login } from '@/api/common'
import { generateKeyMixin } from '@/common/mixins/common'
import { setToken } from '@/utils/auth'
import { REQ_OK } from '@/common/js/code'
export default {
  name: 'login',
  mixins: [generateKeyMixin],
  props: {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { account, password } = this.ruleForm
          this.loading = true
          login(account, this.RSAencrypt(password)).then(({ data }) => {
            if (data.code === REQ_OK) {
              setToken(data.data.token)
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 500)
            }
          })['finally'](() => {
            this.loading = false
          })
        } else {
        }
      })
    }
  },
  watch: {},
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login_container >>> {
    position relative
    height 100%
    .bg-wrapper {
      width 100%
      height 100%
      background-position center
      background-image url("./bg.png")
      background-repeat no-repeat
      background-size cover
    }
    .title {
      position absolute
      top 10%
      left 120px
      display inline-block
      font-size 40px
      font-weight bold
      color #ffffff
    }
    .login-form-wrapper {
      position absolute
      top 22%
      right 9%
      display flex
      flex-direction column
      align-items center
      width 495px
      .out-content {
        width: 100%;
        .in-content {
          display flex
          flex-direction column
          padding 70px 89px
          background-color #ffffff;
          box-shadow: 0 3px 8px 0 rgba(30, 72, 111, 0.16);
          border-radius: 15px;
          .in-title {
            display inline-block
            margin-bottom 57px
            font-size 28px
            font-weight bold
            color #000000
          }
          .el-input {
            width 100%
            .el-input__inner {
              height 46px
              line-height 46px
              &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px rgb(255, 255, 255) inset;
              }
            }
          }
          .submit-content {
            padding-top 70px
            text-align center
            .el-button {
              padding 17px 20px
              width 100%
              font-size 16px
            }
          }
        }
      }
    }
  }
</style>
